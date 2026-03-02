# Popup Chat Widget - PandaC Edition

This site includes a fully customized popup chat widget that automatically appears for new visitors, collects streamlined contact information, and provides a personalized communication experience with conversation management.

## Features

- **🚀 Auto-Popup**: Automatically shows chat to new visitors after configurable delay
- **📱 Streamlined Contact**: Single field for email OR phone number with smart validation  
- **🎨 Theme Integration**: Fully supports Hugo PaperMod light/dark theme switching
- **📱 Responsive Design**: Optimized for all screen sizes with proper mobile support
- **� Conversation Management**: End conversation button with confirmation and history clearing
- **✨ Modern UI**: Clean, minimalist design with smooth animations and transitions
- **🔧 No Overflow Issues**: Properly sized forms that work on all devices
- **🎯 Personalized Branding**: Uses your PandaC branding instead of generic chat icons
- **🚀 Font Awesome Icons**: Simple, scalable icons instead of image dependencies
- **🤖 AI-Powered Responses**: Mix of contextual and API-powered responses
- **🔊 Audio Feedback**: Subtle sound effects for better user experience
- **⚙️ Easy Configuration**: Control all aspects through Hugo config file

## Theme Integration

The popup chat seamlessly integrates with your Hugo PaperMod theme:

- **CSS Variables**: Uses theme's color scheme (--theme, --primary, --secondary, etc.)
- **Automatic Theme Switching**: Adapts to light/dark mode without configuration
- **Consistent Styling**: Matches your site's design language and typography
- **Border and Shadow Support**: Respects theme's border and shadow preferences

## How It Works

1. **Auto-Popup**: Chat automatically appears for new visitors after a configurable delay (default: 3 seconds)

2. **Streamlined Contact Collection**: Single form requesting:
   - Name (required)
   - Email OR Phone (required, with smart validation that detects format)

3. **Smart Validation**:
   - Automatically detects if input is email or phone number
   - Validates email format with regex
   - Validates phone numbers (supports international formats)

4. **Personalized Chat**: Once contact information is provided:
   - Greets user by name
   - References their contact type in responses
   - Provides contextual, relevant responses

5. **Conversation Management**:
   - "End Chat" button for users to terminate conversation
   - Confirmation dialog before ending
   - Clears all chat history and resets to initial state
   - Preserves user session to avoid repeated auto-popups

6. **Mixed Response System**:
   - Contextual responses using user's name and contact type
   - API-powered advice responses
   - Fallback responses for offline scenarios

## Configuration

The popup chat can be configured in your `config.yml` file:

```yaml
params:
  # Popup Chat Configuration
  popupChat:
    enabled: true
    autoPopup: true              # Enable auto-popup for new visitors
    autoPopupDelay: 3000         # Delay in milliseconds (3 seconds)
    title: "Hello"
    subtitle: "share your details"
    teamResponse: "Expect delay in response"
```

### Configuration Options

- `enabled` (boolean): Enable or disable the popup chat widget
- `autoPopup` (boolean): Enable auto-popup for new visitors (default: true)
- `autoPopupDelay` (number): Delay before auto-popup in milliseconds (default: 3000)
- `title` (string): The main greeting title in the chat window
- `subtitle` (string): The subtitle message (supports HTML)
- `teamResponse` (string): Message about team response time

## Files Included

The integration consists of the following files:

### Layouts

- `/layouts/partials/popup-chat.html` - The main chat widget template
- `/layouts/partials/extend_head.html` - Updated to include chat styles and dependencies
- `/layouts/partials/footer.html` - Updated to include chat widget and scripts

### Static Assets

- `/static/css/popup-chat.css` - Clean, theme-aware chat styles
- `/static/js/main.js` - Main navigation and utility functions  
- `/static/js/chat.js` - Enhanced chat functionality with validation and personalization

## Backend Integration

The chat widget is ready for backend integration. Contact information is currently logged to the browser console. To integrate with your backend:

1. **Uncomment the `sendContactInfo` function** in `/static/js/chat.js`
2. **Update the API endpoint** to match your backend URL
3. **Modify the request format** as needed for your backend API

Example backend integration:

```javascript
function sendContactInfo(contactInfo) {
  fetch('/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      source: 'chat-widget',
      timestamp: new Date().toISOString()
    })
  })
  .then(response => response.json())
  .then(data => console.log('Contact saved:', data))
  .catch(error => console.error('Error:', error));
}
```

## Customization

### Contact Form Fields

You can modify the contact form by editing `/layouts/partials/popup-chat.html`:

- Add or remove form fields
- Change field labels and placeholders
- Modify validation requirements

### Styling

The chat widget uses your Hugo theme's CSS variables for seamless integration. Key customizable elements:

- `.chat-bar-open button` - Main chat button with theme colors
- `.hi-there` - Greeting section using --primary/--theme colors  
- `.chat-window` and `.chat-window2` - Chat windows with proper theme support
- `.form-group input` - Form inputs that respect theme colors and borders
- Responsive breakpoints optimized for mobile devices

### Icons and Branding

The widget uses Font Awesome icons for better scalability and theme integration:

- **Chat Button**: `fas fa-comments` - Universal chat symbol
- **Close Button**: `fas fa-times` - Clear close indication
- **Send Button**: `fas fa-paper-plane` - Modern send icon
- **Bot Avatar**: 🤖 emoji - Friendly AI representation
- **Branding**: "powered by PandaC" with robot icon

## Disabling the Chat Widget

To completely disable the popup chat widget, set `enabled: false` in your configuration:

```yaml
params:
  popupChat:
    enabled: false
```

This will prevent the chat widget from loading entirely, removing both the visual elements and JavaScript functionality.
