
This document outlines the step-by-step process for integrating Adyen into Salesforce Commerce Cloud (SFCC) and configuring the necessary settings in the Adyen sandbox.

## Step 1: Login to Adyen Sandbox

1. Go to the Adyen sandbox URL: [Adyen Developer Sandbox](https://authn-live.adyen.com/authn/ui/login?request=eyJBdXRoblJlcXVlc3QiOnsiYWN0aXZpdHlHcm91cCI6IkJPX0NBIiwiY3JlZHNSZWFzb24iOlsiTG9nZ2luZyBpbiB0byBhcHBsaWNhdGlvbiBjYSJdLCJmb3JjZU5ld1Nlc3Npb24iOiJmYWxzZSIsImZvcmdvdFBhc3N3b3JkVXJsIjoiaHR0cHM6XC9cL2NhLWxpdmUuYWR5ZW4uY29tXC9jYVwvbG9iYnlcL3Bhc3N3b3JkLXJlc2V0XC9mb3Jnb3QtcGFzc3dvcmQiLCJyZXF1ZXN0VGltZSI6IjIwMjQtMTItMzBUMTQ6NTE6MDUrMDE6MDAiLCJyZXF1ZXN0ZWRDcmVkZW50aWFscyI6W3siUmVxdWVzdGVkQ3JlZGVudGlhbCI6eyJhY2NlcHRlZEFjdGl2aXR5IjpbeyJBY2NlcHRlZEFjdGl2aXR5Ijp7ImFjdGl2aXR5R3JvdXAiOiJCT19DQSIsImFjdGl2aXR5VHlwZSI6IklNUExJQ0lUIiwibWlsbGlzZWNvbmRzQWdvIjo5MDAwMDB9fV0sInR5cGUiOiJQQVNTV09SRCJ9fSx7IlJlcXVlc3RlZENyZWRlbnRpYWwiOnsiYWNjZXB0ZWRBY3Rpdml0eSI6W3siQWNjZXB0ZWRBY3Rpdml0eSI6eyJhY3Rpdml0eUdyb3VwIjoiQk9fQ0EiLCJhY3Rpdml0eVR5cGUiOiJHUkFDRV9DT09LSUUiLCJtaWxsaXNlY29uZHNBZ28iOjB9fV0sInR5cGUiOiJUV09fRkFDVE9SIn19XSwicmVxdWVzdGluZ0FwcCI6ImNhIiwicmV0dXJuVXJsIjoiaHR0cHM6XC9cL2NhLWxpdmUuYWR5ZW4uY29tXC9jYVwvY2FcL292ZXJ2aWV3XC9kZWZhdWx0LnNodG1sIiwic2lnbmF0dXJlIjoiVjAwM1NOUDZXckNwdTVcL1JhSFhadUNTS2hmbWNNWGZiYlk1Y1lJOVwvaVlnQU9kTG89In19)

1. Login using your sandbox credentials.


## Step 2: Create a New Merchant Account

1. Navigate to the **"Settings"** section in the Adyen dashboard.

2. Under **"Merchant Account"**, create a new **Merchant Account**:

    - Provide the required details for the new merchant account (e.g., merchant name, description, etc.).

3. Verify the status of the newly created merchant account. Ensure it is active before proceeding.

	![alt text](<Pasted image 20241230192654.png>)

## Step 3: Create a New API Credential

1. Navigate to the **"Developers"** section in the Adyen dashboard.

2. Under **"API Credentials"**, create a new credential:

    - Provide a **description** for the credential.

    - Check its **status** to ensure it is active.

3. Generate the **API Key**:

    - After creating the API credential, generate the API key and note it down securely (it will only be shown once).

    - Copy the **Client Key** for later use.

4. Add the sandbox URL to the **Allowed Origins**:

    - Go to the "Allowed Origins" section and add your SFCC sandbox URL (e.g., `https://your-sandbox-url.com`).


![alt text](<Pasted image 20241230192802.png>)

![alt text](<Pasted image 20241230192846.png>)

## Step 4: Create a New Standard Webhook

1. Navigate to the **"Developers"** section in the Adyen dashboard.

2. Under **"Webhooks"**, create a new webhook:

    - Choose the **Standard Webhook** option.

3. Configure the webhook with the following settings:

    - **URL:** Provide the SFCC sandbox webhook endpoint (e.g., `https://sandbox-url.com/Adyen-Notify`).

    - **Method:** JSON.

    - **Encryption Protocol:** TLSv1.3.

4. Configure the **Security** settings:

    - Under **Basic Authentication**, create a new username and password.

    - Save the username and password. These will be used in SFCC custom preferences:

        - `Adyen_notification_user`

        - `Adyen_notification_password`
	![alt text](<Pasted image 20241230193307.png>)

## Step 5: Configure SFCC Custom Preferences

1. In the SFCC Business Manager, navigate to **Merchant Tools** > **Custom Preferences**.

2. Add the following custom preferences:

    - **Adyen_notification_user:** Enter the username created in the webhook's Basic Authentication section.

    - **Adyen_notification_password:** Enter the password created in the webhook's Basic Authentication section.

    - **Adyen_api_key:** Enter the API key generated earlier.

    - **Adyen_client_key:** Enter the Client Key generated earlier.

    - **Adyen_sandbox_url:** Enter the sandbox URL added in the allowed origins.

3. Save the preferences.


## Step 6: Testing the Integration

1. Test the webhook setup using Adyen's **Webhook Test** feature:

    - Navigate to the Webhook you created and use the "Test" option to send a sample notification.

    - Verify that the webhook is successfully received by SFCC.

2. Validate the payment flow:

    - Place test orders in your SFCC sandbox and verify that Adyen processes the payments correctly.

    - Check notifications in the webhook logs to ensure they are received and processed as expected.


## Step 7: Final Validation

1. Verify that all configurations are correct and operational.

2. Ensure secure handling of API keys, client keys, and credentials.

3. Perform end-to-end testing of the integration.

4. Also Check for ***Controllers and hooks**
