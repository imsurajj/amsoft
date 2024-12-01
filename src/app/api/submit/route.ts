import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Type checking environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.error('Missing env variables:', {
    hasSheetId: !!SHEET_ID,
    hasClientEmail: !!CLIENT_EMAIL,
    hasPrivateKey: !!PRIVATE_KEY
  });
  throw new Error('Missing required environment variables');
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { name, email } = body;

    console.log('Received submission:', { name, email });

    // Type narrowing and validation
    if (typeof name !== 'string' || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Name and email must be strings' },
        { status: 400 }
      );
    }

    if (name.trim() === '' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Name and email cannot be empty' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Creating JWT with:', {
      email: CLIENT_EMAIL,
      keyLength: PRIVATE_KEY?.length,
    });

    // Validate PRIVATE_KEY is defined
    if (!PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY environment variable is not set');
    }

    // Format the private key by replacing escaped newlines with actual newlines
    const formattedPrivateKey = PRIVATE_KEY.replace(/\\n/g, '\n');

    // Auth
    const jwt = new JWT({
      email: CLIENT_EMAIL,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Initializing spreadsheet...');

    // Validate SHEET_ID is defined
    if (!SHEET_ID) {
      throw new Error('SHEET_ID environment variable is not set');
    }

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    await doc.loadInfo().catch((error) => {
      console.error('Error loading spreadsheet:', {
        message: error.message,
        stack: error.stack,
        details: error.response?.data
      });
      throw new Error(`Failed to load spreadsheet: ${error.message}`);
    });

    console.log('Spreadsheet loaded:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      throw new Error('Sheet not found');
    }

    console.log('Adding row to sheet:', sheet.title);

    // Add the row
    await sheet.addRow({
      Name: name,
      Email: email,
      Timestamp: new Date().toISOString(),
    });

    console.log('Row added successfully');

    return NextResponse.json(
      { success: true, message: 'Data submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submission error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    
    // Provide more specific error messages based on the error type
    const errorMessage = error instanceof Error ? error.message : 'Submission failed';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
