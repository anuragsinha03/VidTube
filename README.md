
# Vid Tube

VidTube is a video streaming web application for streaming non stop YouTube videos without advertisements


## Run Locally

Clone the project

```bash
  git clone https://https://github.com/anuragsinha03/VidTube
```

Go to the project directory

```bash
  cd VidTube
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## YouTube Data API

VidTube uses YouTube Data API for fetching the video data, channel data, like count, comment count, subscribers count and more


## Obtaining a YouTube Data API Key

To access YouTube's data through their API, you'll need to obtain an API key. Follow these steps to get your API key:

#### 1. Sign in to Google Developer Console:
Go to the Google Developer Console, and sign in with your Google account.

#### 2. Create a New Project:
If you don't have an existing project, you'll need to create one. Click on the project drop-down menu at the top of the page, then click on "New Project". Follow the prompts to create a new project.

#### 3. Enable the YouTube Data API:
Once you're in your project, navigate to the API Library by selecting "APIs & Services" > "Library" from the left-hand menu. Search for "YouTube Data API" and click on it. Then, click the "Enable" button.

#### 4. Create Credentials:
After enabling the YouTube Data API, navigate to the "Credentials" tab in the left-hand menu. Click on the "Create Credentials" drop-down button and select "API key". This will generate your API key.

#### 5. Restrict API Key (Optional but Recommended):
For security purposes, you may want to restrict your API key. You can restrict it based on IP addresses, referrers, or APIs. This helps prevent unauthorized use of your key and keeps your usage within your limits.

#### 6. Copy Your API Key:
Once your API key is generated, copy it to your clipboard. This key will be used to authenticate your requests to the YouTube Data API.

#### 7. Use Your API Key:
In your project, you can now use your API key to authenticate requests to the YouTube Data API. Make sure to include this key in the headers or query parameters of your requests.

#### 8. Keep Your API Key Secure:
Treat your API key as sensitive information and avoid exposing it in public repositories or sharing it with unauthorized individuals. Consider storing it in environment variables or using a secure secrets management system.

For more detailed instructions and documentation, refer to the YouTube Data API documentation.
