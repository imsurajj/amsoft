import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import credentials from './credentials.json';

// Validate environment variables
if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error('GOOGLE_SHEET_ID is not defined in environment variables');
}
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

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

    console.log('Creating JWT...');

    // Create JWT using credentials file
    const jwt = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Initializing spreadsheet...');

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
