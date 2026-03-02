# PandaC Popup Chat Widget - API Integration Guide

## Overview

This document describes the secure API integration for the PandaC popup chat widget, including authentication, message handling, and fallback strategies.

## API Endpoints

### 1. Contact Registration Endpoint
**URL:** `POST https://pandac.in/api/v1/chat`

**Purpose:** Register user contact information and receive authentication token for chat session.

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "name": "string",
  "contact": "string (email or phone)",
  "contactType": "email|phone",
  "source": "chat-widget",
  "timestamp": "ISO 8601 timestamp",
  "userAgent": "string",
  "referrer": "string"
}
```

**Expected Response:**
```json
{
  "token": "jwt-authentication-token",
  "sessionId": "unique-session-identifier",
  "message": "Authentication successful"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid contact information
- `429 Too Many Requests`: Rate limiting exceeded
- `500 Internal Server Error`: Server error

### 2. Chat Message Endpoint
**URL:** `POST https://pandac.in/api/v1/chat/message`

**Purpose:** Send user messages and receive AI/admin responses.

**Request Headers:**
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "message": "string",
  "timestamp": "ISO 8601 timestamp",
  "userInfo": {
    "name": "string",
    "contactType": "email|phone"
  }
}
```

**Expected Response:**
```json
{
  "response": "AI or admin response text",
  "timestamp": "ISO 8601 timestamp",
  "messageId": "unique-message-id"
}
```

### 3. Token Validation Endpoint (Optional)
**URL:** `GET https://pandac.in/api/v1/chat/validate`

**Purpose:** Validate current authentication token.

**Request Headers:**
```
Authorization: Bearer <jwt-token>
Accept: application/json
```

**Expected Response:**
- `200 OK`: Token is valid
- `401 Unauthorized`: Token expired or invalid

## Security Features

### 1. Token Management
- JWT tokens stored securely in `localStorage`
- Automatic token cleanup on expiration (24 hours)
- Session validation on page load
- Token cleared on authentication failures

### 2. Error Handling
- Network connectivity error detection
- Server error categorization (4xx vs 5xx)
- User-friendly error messages
- Graceful degradation to fallback responses

### 3. Data Security
- HTTPS-only communication
- No sensitive data stored in frontend code
- Token transmitted via secure headers
- User data validated before transmission

## Fallback Strategy

The chat widget implements a 3-tier fallback system:

### Priority 1: PandaC API
When authenticated (`authToken` exists), the widget attempts to use your API for responses.

### Priority 2: Contextual Responses
If API is unavailable, the widget generates contextual responses based on:
- User's name and contact type
- Message content analysis (greetings, services, pricing, technical)
- Message length and complexity
- Previous conversation context

**Example Contextual Responses:**
- **Greeting:** "Hello [Name]! Great to meet you. How can I assist you today?"
- **Service Inquiry:** "Hi [Name]! I'd be happy to help you with our services..."
- **Pricing:** "For pricing information, our team will reach out via your [contact method]..."
- **Technical:** "Our technical team will provide detailed information..."

### Priority 3: External API Fallback
Uses Advice Slip API as a last resort with personalized formatting.

### Priority 4: Guaranteed Fallback
If all APIs fail, provides a guaranteed response acknowledging the user's message.

## Client-Side Implementation

### Authentication Flow
```javascript
// 1. Collect user info
const userInfo = { name, contact, contactType };

// 2. Send to registration endpoint
const result = await sendContactInfo(userInfo);

// 3. Store token securely
if (result.success) {
  authToken = result.token;
  localStorage.setItem('pandac-chat-auth-token', authToken);
}
```

### Message Handling
```javascript
// 1. Send message with authentication
const response = await sendChatMessage(userMessage);

// 2. Display response or fallback
if (response) {
  displayChatResponse(response);
} else {
  // Use contextual fallback
  const contextualResponse = generateContextualResponse(userMessage);
  displayChatResponse(contextualResponse);
}
```

### State Persistence
```javascript
// Save state across page navigation
function saveChatState() {
  const state = {
    userInfo: userInfo,
    authToken: authToken,
    isActive: chatWindowOpen,
    timestamp: Date.now()
  };
  localStorage.setItem('pandac-chat-state', JSON.stringify(state));
}
```

## Configuration Options

### Auto-Popup Settings
```html
<meta name="chat-auto-popup" content="true">
<meta name="chat-auto-popup-delay" content="3000">
```

### Hugo Config Parameters
```yaml
params:
  popupChat:
    enabled: true
    autoPopup: true
    autoPopupDelay: 3000
    persistState: true
    apiEndpoint: "https://pandac.in/api/v1/chat"
```

## Testing & Debugging

### Console Logging
The widget provides detailed console logs for debugging:
- Authentication attempts
- API call successes/failures
- Fallback strategy execution
- State persistence operations

### Error Monitoring
- Network errors are caught and logged
- API response errors are categorized
- User-friendly error messages displayed
- Fallback responses always provided

## Browser Compatibility

- **Modern Browsers:** Full feature support
- **localStorage:** Required for state persistence
- **fetch API:** Required for API calls
- **ES6 Features:** Arrow functions, async/await, template literals

## Performance Considerations

- **Lazy Loading:** Chat widget loads after page content
- **Debounced Requests:** Prevents duplicate API calls
- **Cached Responses:** Auth tokens cached for session
- **Fallback Speed:** Contextual responses are instant
- **Audio Preloading:** Sound files loaded on demand

## Deployment Checklist

- [ ] API endpoints are accessible via HTTPS
- [ ] CORS headers properly configured for your domain
- [ ] JWT tokens have appropriate expiration times
- [ ] Rate limiting implemented on backend
- [ ] Error logging configured for monitoring
- [ ] Fallback responses tested and verified
- [ ] Mobile responsiveness validated
- [ ] Cross-browser compatibility tested

## Support & Maintenance

For issues or questions regarding the popup chat integration:
- Check browser console for error messages
- Verify API endpoint availability
- Test fallback response system
- Review localStorage for stored state
- Monitor network requests in browser DevTools

---

**Last Updated:** August 15, 2025
**Version:** 2.0.0 with API Integration
**Author:** PandaC Development Team
