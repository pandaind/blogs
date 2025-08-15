let audio1 = new Audio(
  "https://cdn.jsdelivr.net/gh/pandaind/pandac-store-cdn/popup.mp3"
);

// Store user information
let userInfo = {
  name: '',
  contact: '',
  contactType: '' // 'email' or 'phone'
};

// Authentication token storage
let authToken = null;

// Chat state management
const CHAT_STATE_KEY = 'pandac-chat-state';
const CHAT_HISTORY_KEY = 'pandac-chat-history';
const AUTH_TOKEN_KEY = 'pandac-chat-auth-token';

// Save chat state to localStorage
function saveChatState() {
  const state = {
    userInfo: userInfo,
    authToken: authToken,
    isActive: document.getElementById("chat-window2").style.display === "block",
    isFormComplete: userInfo.name && userInfo.contact,
    timestamp: Date.now()
  };
  localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(state));
  
  // Store auth token separately for security
  if (authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  }
}

// Save chat history to localStorage
function saveChatHistory() {
  const messageBox = document.getElementById("messageBox");
  const chatMessages = [];
  
  // Extract all chat messages (excluding greeting and user info)
  const messages = messageBox.querySelectorAll('.first-chat, .second-chat:not(.user-info .second-chat)');
  messages.forEach(msg => {
    const isUser = msg.classList.contains('first-chat');
    const text = msg.querySelector('p').textContent;
    chatMessages.push({
      isUser: isUser,
      text: text,
      timestamp: Date.now()
    });
  });
  
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatMessages));
}

// Load chat state from localStorage
function loadChatState() {
  const savedState = localStorage.getItem(CHAT_STATE_KEY);
  if (!savedState) return false;
  
  try {
    const state = JSON.parse(savedState);
    
    // Check if state is not too old (24 hours)
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (Date.now() - state.timestamp > twentyFourHours) {
      clearChatState();
      return false;
    }
    
    // Restore user info
    userInfo = state.userInfo;
    
    // Restore auth token
    authToken = localStorage.getItem(AUTH_TOKEN_KEY) || null;
    
    // If user has completed contact form, restore their info even if chat wasn't active
    if (state.isFormComplete) {
      // Fill form fields (in case they're needed)
      document.getElementById("userName").value = userInfo.name;
      document.getElementById("userContact").value = userInfo.contact;
      
      // Update chat UI
      document.getElementById("chatUserName").textContent = userInfo.name;
      document.getElementById("userInfoDisplay").style.display = "block";
    }
    
    // Restore chat state if it was active
    if (state.isActive && state.isFormComplete) {
      // Show chat window
      document.getElementById("chat-window2").style.display = "block";
      document.getElementById("chat-window1").style.display = "none";
      document.getElementById("chat-open").style.display = "none";
      document.getElementById("chat-close").style.display = "block";
      
      // Load chat history
      loadChatHistory();
      
      return true;
    }
    
    // Return true if user info is available (even if chat wasn't active)
    return state.isFormComplete;
  } catch (e) {
    console.error('Error loading chat state:', e);
    clearChatState();
    return false;
  }
}

// Load chat history from localStorage
function loadChatHistory() {
  const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
  if (!savedHistory) return;
  
  try {
    const history = JSON.parse(savedHistory);
    const messageBox = document.getElementById("messageBox");
    
    // Add messages back to chat
    history.forEach(msg => {
      if (msg.isUser) {
        messageBox.innerHTML += `<div class="first-chat">
          <p>${msg.text}</p>
          <div class="arrow"></div>
        </div>`;
      } else {
        messageBox.innerHTML += `<div class="second-chat">
          <div class="circle" id="circle-mar"></div>
          <p>${msg.text}</p>
          <div class="arrow"></div>
        </div>`;
      }
    });
    
    // Scroll to bottom
    messageBox.scrollTop = messageBox.scrollHeight;
  } catch (e) {
    console.error('Error loading chat history:', e);
  }
}

// Clear chat state
function clearChatState() {
  localStorage.removeItem(CHAT_STATE_KEY);
  localStorage.removeItem(CHAT_HISTORY_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  authToken = null;
}

// Initialize chat on page load
window.addEventListener('DOMContentLoaded', function() {
  // Load stored auth token first
  authToken = localStorage.getItem(AUTH_TOKEN_KEY) || null;
  
  // Try to restore previous chat state
  const stateRestored = loadChatState();
  
  // If state was restored (user info exists), no auto-popup needed
  if (stateRestored) {
    console.log('Chat state restored - user has previous conversation');
    return;
  }
  
  // If no state was restored, handle auto-popup for new users
  // Get auto-popup settings from meta tags or default values
  const autoPopupEnabled = document.querySelector('meta[name="chat-auto-popup"]')?.content !== 'false';
  const autoPopupDelay = parseInt(document.querySelector('meta[name="chat-auto-popup-delay"]')?.content) || 3000;
  
  if (autoPopupEnabled) {
    setTimeout(() => {
      // Only auto-popup if user hasn't interacted with chat before in this session
      if (!sessionStorage.getItem('chatInteracted')) {
        chatOpen();
        sessionStorage.setItem('chatInteracted', 'true');
      }
    }, autoPopupDelay);
  }
});

// Save state before page unload
window.addEventListener('beforeunload', function() {
  if (userInfo.name && userInfo.contact) {
    saveChatState();
    saveChatHistory();
  }
});

// API Integration Functions
// Send contact info to backend and get auth token
async function sendContactInfo(contactInfo) {
  try {
    const response = await fetch('https://pandac.in/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: contactInfo.name,
        contact: contactInfo.contact,
        contactType: contactInfo.contactType,
        source: 'chat-widget',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.token) {
      authToken = data.token;
      localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      console.log('Authentication successful - API features enabled');
      return { success: true, token: data.token, sessionId: data.sessionId, apiEnabled: true };
    } else {
      throw new Error('Authentication failed: No token received from server');
    }
  } catch (error) {
    console.error('Contact authentication error:', error);
    
    // Check if it's a network connectivity issue
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      console.log('API unreachable - continuing with contextual chat mode');
      return { success: true, token: null, apiEnabled: false, mode: 'offline' };
    }
    
    // For other errors, also allow chat but log the issue
    if (error.message.includes('Server error: 5')) {
      console.log('Server error - continuing with contextual chat mode');
      return { success: true, token: null, apiEnabled: false, mode: 'offline' };
    }
    
    // For client errors (400s), show specific error but still allow chat
    let userMessage = 'Unable to connect to our servers, but you can still chat with me! ';
    if (error.message.includes('Server error: 4')) {
      userMessage = 'There was an issue with the provided information, but you can still chat with me! ';
    }
    
    console.log(userMessage + 'Using contextual response mode.');
    return { success: true, token: null, apiEnabled: false, mode: 'offline', message: userMessage };
  }
}

// Send chat message to backend
async function sendChatMessage(message) {
  if (!authToken) {
    console.log('No auth token available, using contextual response');
    return null;
  }

  try {
    const response = await fetch('https://pandac.in/api/v1/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        message: message,
        timestamp: new Date().toISOString(),
        userInfo: {
          name: userInfo.name,
          contactType: userInfo.contactType
        }
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, clear auth and use contextual response
        console.log('Auth token expired, clearing state and using contextual response');
        clearChatState();
        return null;
      }
      
      if (response.status >= 500) {
        console.log('Server error, falling back to contextual response');
        return null;
      }
      
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response received successfully');
    return data.response || data.message || 'Thank you for your message!';
  } catch (error) {
    if (error.name === 'TypeError' || error.message.includes('fetch')) {
      console.log('Network error - API unreachable, using contextual response');
    } else {
      console.error('Chat message API error:', error);
    }
    return null; // Return null to trigger contextual response
  }
}

// Validate auth token (optional - for session validation)
async function validateAuthToken() {
  if (!authToken) return false;

  try {
    const response = await fetch('https://pandac.in/api/v1/chat/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });

    if (response.status === 401) {
      clearChatState();
      return false;
    }

    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

function chatOpen() {
  document.getElementById("chat-open").style.display = "none";
  document.getElementById("chat-close").style.display = "block";
  
  // Check if user has already completed contact form and started conversation
  if (userInfo.name && userInfo.contact) {
    // User has active conversation - show chat window directly
    document.getElementById("chat-window2").style.display = "block";
    document.getElementById("chat-window1").style.display = "none";
    
    // Load chat history if available
    loadChatHistory();
    
    // Update UI with user info
    document.getElementById("chatUserName").textContent = userInfo.name;
    document.getElementById("userInfoDisplay").style.display = "block";
    
    // Scroll to bottom
    setTimeout(() => {
      var objDiv = document.getElementById("messageBox");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  } else {
    // User hasn't provided contact info yet - show contact form
    document.getElementById("chat-window1").style.display = "block";
    document.getElementById("chat-window2").style.display = "none";
  }

  audio1.load();
  audio1.play();
  
  // Save state
  saveChatState();
}

function chatClose() {
  document.getElementById("chat-open").style.display = "block";
  document.getElementById("chat-close").style.display = "none";
  document.getElementById("chat-window1").style.display = "none";
  document.getElementById("chat-window2").style.display = "none";

  audio1.load();
  audio1.play();
  
  // Save state
  saveChatState();
}

// Validate contact information and start conversation
async function validateAndStartConversation() {
  const name = document.getElementById("userName").value.trim();
  const contact = document.getElementById("userContact").value.trim();

  // Validate required fields
  if (!name) {
    alert("Please enter your name.");
    document.getElementById("userName").focus();
    return;
  }

  if (!contact) {
    alert("Please enter your email or phone number.");
    document.getElementById("userContact").focus();
    return;
  }

  // Determine if contact is email or phone
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  
  let contactType = '';
  if (emailRegex.test(contact)) {
    contactType = 'email';
  } else if (phoneRegex.test(contact.replace(/[\s\-\(\)]/g, ''))) {
    contactType = 'phone';
  } else {
    alert("Please enter a valid email address or phone number.");
    document.getElementById("userContact").focus();
    return;
  }

  // Store user information
  userInfo.name = name;
  userInfo.contact = contact;
  userInfo.contactType = contactType;

  // Send contact information to backend and get auth token
  console.log("Attempting to connect to PandaC API...");
  const result = await sendContactInfo(userInfo);
  
  // Always allow chat to continue, regardless of API status
  if (result.success) {
    if (result.apiEnabled) {
      console.log("✅ API Connected - Full features available");
    } else {
      console.log("💬 API Offline - Using contextual chat mode");
      if (result.message) {
        // Show a brief message about offline mode but don't block the chat
        setTimeout(() => {
          displayChatResponse(`${result.message} I'm still here to help answer your questions!`);
        }, 500);
      }
    }
  }

  console.log("Starting conversation...");

  // Update chat window with user name
  document.getElementById("chatUserName").textContent = name;
  
  // Show user info in chat
  document.getElementById("userInfoDisplay").style.display = "block";

  openConversation();
}

function openConversation() {
  document.getElementById("chat-window2").style.display = "block";
  document.getElementById("chat-window1").style.display = "none";

  audio1.load();
  audio1.play();

  // Scroll to bottom
  var objDiv = document.getElementById("messageBox");
  objDiv.scrollTop = objDiv.scrollHeight;
  
  // Save state
  saveChatState();
}

// End conversation with confirmation
function endConversation() {
  const confirmEnd = confirm("Are you sure you want to end this conversation? All chat history will be cleared.");
  
  if (confirmEnd) {
    // Clear stored state
    clearChatState();
    
    // Clear chat history
    const messageBox = document.getElementById("messageBox");
    const hiThere = messageBox.querySelector('.hi-there');
    const userInfoDiv = messageBox.querySelector('.user-info');
    
    // Keep only the greeting and user info, remove all chat messages
    messageBox.innerHTML = '';
    messageBox.appendChild(hiThere);
    if (userInfoDiv) {
      messageBox.appendChild(userInfoDiv);
    }
    
    // Clear user info
    userInfo.name = '';
    userInfo.contact = '';
    userInfo.contactType = '';
    
    // Reset to initial state
    document.getElementById("chat-window2").style.display = "none";
    document.getElementById("chat-window1").style.display = "block";
    
    // Clear form
    document.getElementById("userName").value = '';
    document.getElementById("userContact").value = '';
    
    // Hide user info display
    document.getElementById("userInfoDisplay").style.display = "none";
    document.getElementById("chatUserName").textContent = '';
    
    // Play sound
    audio1.load();
    audio1.play();
    
    console.log("Conversation ended and cleared");
  }
}

//Gets the text from the input box(user)
function userResponse() {
  console.log("response");
  let userText = document.getElementById("textInput").value;

  if (userText == "") {
    alert("Please type something!");
  } else {
    document.getElementById("messageBox").innerHTML += `<div class="first-chat">
      <p>${userText}</p>
      <div class="arrow"></div>
    </div>`;
    let audio3 = new Audio(
      "https://cdn.jsdelivr.net/gh/pandaind/pandac-store-cdn/send.mp3"
    );
    audio3.load();
    audio3.play();

    document.getElementById("textInput").value = "";
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;

    // Save chat history
    saveChatHistory();

    setTimeout(() => {
      adminResponse();
    }, 1000);
  }
}

//admin Response to user's message with user context
async function adminResponse() {
  // Get the user's last message
  const messages = document.querySelectorAll('#messageBox .first-chat p');
  const lastMessage = messages.length > 0 ? messages[messages.length - 1].textContent : '';
  
  // Priority 1: Use your PandaC API if authenticated and available
  if (authToken && lastMessage) {
    console.log("🔗 Trying PandaC API...");
    try {
      const apiResponse = await sendChatMessage(lastMessage);
      if (apiResponse) {
        console.log("✅ PandaC API response received");
        displayChatResponse(apiResponse);
        return;
      }
      console.log("⚠️ API unavailable, switching to contextual mode");
    } catch (error) {
      console.error('PandaC API error:', error);
    }
  }
  
  // Priority 2: Use intelligent contextual responses
  if (userInfo.name && lastMessage) {
    console.log("🤖 Generating contextual response...");
    const contextualResponse = generateContextualResponse(lastMessage);
    if (contextualResponse) {
      displayChatResponse(contextualResponse);
      return;
    }
  }
  
  // Priority 3: Use external API (Advice Slip) as creative fallback
  console.log("🌐 Using external API fallback...");
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const adviceData = await response.json();
    const advice = adviceData.slip.advice;
    displayChatResponse(`Hi ${userInfo.name || 'there'}! Here's some wisdom: ${advice} 💡`);
  } catch (error) {
    console.error('External API also failed:', error);
    // Priority 4: Guaranteed response - never fail
    console.log("🛡️ Using guaranteed fallback response");
    const finalResponse = userInfo.name 
      ? `Thanks for your message, ${userInfo.name}! I've received it and our team will get back to you via your ${userInfo.contactType || 'contact method'}. Feel free to ask me anything else! 😊`
      : "Thanks for your message! I'm here to help with any questions you might have. What else would you like to know? 😊";
    displayChatResponse(finalResponse);
  }
}

// Helper function to display chat responses
function displayChatResponse(responseText) {
  document.getElementById("messageBox").innerHTML += `<div class="second-chat">
    <div class="circle" id="circle-mar"></div>
    <p>${responseText}</p>
    <div class="arrow"></div>
  </div>`;
  
  let audio3 = new Audio(
    "https://cdn.jsdelivr.net/gh/pandaind/pandac-store-cdn/response.mp3"
  );
  audio3.load();
  audio3.play();

  var objDiv = document.getElementById("messageBox");
  objDiv.scrollTop = objDiv.scrollHeight;
  
  // Save chat history
  saveChatHistory();
}

// Helper function to generate contextual responses
function generateContextualResponse(userMessage) {
  const message = userMessage.toLowerCase();
  const name = userInfo.name;
  const contactType = userInfo.contactType === 'email' ? 'email' : 'phone number';
  
  // Advanced keyword matching for better contextual responses
  
  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
    const greetings = [
      `Hello ${name}! Welcome to my personal blog and portfolio. I'm here to help answer any questions you might have.`,
      `Hi there ${name}! Great to connect with you. How can I assist you today?`,
      `Hey ${name}! Thanks for visiting my site. What brings you here today?`,
      `Good to meet you, ${name}! I'm here to help. What would you like to know about my work or services?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // About PandaC / Company inquiries
  if (message.includes('about') || message.includes('company') || message.includes('pandac') || message.includes('who are you')) {
    return `Hi ${name}! I'm a passionate developer and tech enthusiast behind PandaC. This is my personal blog and showcase site where I share my projects, insights, and expertise. I'll get back to you via your ${contactType} with more details about my background and experience.`;
  }
  
  // Service inquiries
  if (message.includes('service') || message.includes('what do you do') || message.includes('offerings') || message.includes('solutions')) {
    return `Hi ${name}! I offer freelance development services including web applications, mobile apps, backend development, and technical consulting. As an individual developer, I provide personalized attention to each project. I'll reach out via your ${contactType} to discuss how I can help with your specific needs.`;
  }
  
  // Technical questions
  if (message.includes('technical') || message.includes('technology') || message.includes('development') || message.includes('programming') || message.includes('coding')) {
    return `Great technical question, ${name}! I work with cutting-edge technologies including modern web frameworks, cloud platforms, AI/ML, and mobile development. You can check out my blog posts and projects on this site to see my technical expertise in action. I'll provide you with detailed insights via your ${contactType}.`;
  }
  
  // Pricing inquiries
  if (message.includes('price') || message.includes('cost') || message.includes('rate') || message.includes('budget') || message.includes('quote')) {
    return `${name}, my rates depend on the project scope and complexity. As a freelance developer, I offer competitive pricing and flexible arrangements. I'll contact you via your ${contactType} with a personalized quote based on your requirements.`;
  }
  
  // Support/Help requests
  if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('issue') || message.includes('assistance')) {
    return `I'm here to help, ${name}! Whether it's technical guidance, project consultation, or general inquiries about my work, I'm ready to assist. I'll reach out to you via your ${contactType} to provide the support you need.`;
  }
  
  // Contact/Meeting requests
  if (message.includes('contact') || message.includes('call') || message.includes('meeting') || message.includes('discuss') || message.includes('talk')) {
    return `Absolutely, ${name}! I'd be happy to connect with you. I have your ${contactType} and will get in touch with you shortly to schedule a convenient time to discuss your needs or interests.`;
  }
  
  // Project inquiries
  if (message.includes('project') || message.includes('work') || message.includes('collaboration') || message.includes('partnership')) {
    return `That sounds interesting, ${name}! I love working on exciting projects and collaborating with like-minded individuals. I'll contact you via your ${contactType} to learn more about your project requirements and how we can work together.`;
  }
  
  // Timeline/Delivery questions
  if (message.includes('time') || message.includes('when') || message.includes('deadline') || message.includes('delivery') || message.includes('schedule')) {
    return `Good question, ${name}! Project timelines vary based on scope and complexity. As a solo developer, I pride myself on clear communication and realistic timelines. I'll discuss specific timeframes and my current availability with you via your ${contactType}.`;
  }
  
  // Portfolio/Experience questions
  if (message.includes('portfolio') || message.includes('experience') || message.includes('past work') || message.includes('examples') || message.includes('case studies')) {
    return `${name}, you can explore my portfolio and projects right here on this site! I've documented my work, technical articles, and case studies in my blog. I'd also love to share specific examples relevant to your interests via your ${contactType}.`;
  }
  
  // Thank you responses
  if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
    return `You're very welcome, ${name}! It's my pleasure to help. Feel free to browse my blog posts and projects while you're here. I'll also follow up with you via your ${contactType} if you have any more questions.`;
  }
  
  // Complaint or concern
  if (message.includes('complaint') || message.includes('concern') || message.includes('worried') || message.includes('disappointed')) {
    return `I understand your concern, ${name}, and I apologize for any inconvenience. Your feedback is important to me as I strive to provide the best service possible. I'll prioritize addressing this matter and contact you via your ${contactType} to resolve it promptly.`;
  }
  
  // Location/Office questions
  if (message.includes('location') || message.includes('office') || message.includes('where') || message.includes('address')) {
    return `${name}, I work remotely which allows me to serve clients globally while keeping costs competitive. This also means I can be flexible with timing and communication methods. I'll share more details about how I work and collaborate via your ${contactType}.`;
  }
  
  // Technology stack questions
  if (message.includes('react') || message.includes('node') || message.includes('python') || message.includes('java') || message.includes('aws') || message.includes('cloud')) {
    return `Great question about my tech stack, ${name}! I work with modern technologies including React, Node.js, Python, AWS, and many other cutting-edge tools. You can see examples of my work with these technologies in my blog posts. I'll provide detailed information about my capabilities via your ${contactType}.`;
  }
  
  // Emergency or urgent requests
  if (message.includes('urgent') || message.includes('emergency') || message.includes('asap') || message.includes('immediately')) {
    return `I understand this is urgent, ${name}! As a solo developer, I'll prioritize your request. I'll contact you via your ${contactType} as soon as possible to address your urgent needs.`;
  }
  
  // General responses based on message characteristics
  if (message.length > 100) {
    return `Thank you for the detailed message, ${name}! I can see you've put thought into your inquiry. I'll review your message carefully and provide a comprehensive response via your ${contactType}.`;
  }
  
  if (message.includes('?')) {
    return `That's a great question, ${name}! I'll provide you with a detailed answer. Expect to hear from me via your ${contactType} soon.`;
  }
  
  // Sentiment-based responses
  if (message.includes('excited') || message.includes('interested') || message.includes('looking forward')) {
    return `That's wonderful to hear, ${name}! I'm equally excited to connect with you. I'll contact you via your ${contactType} to discuss the next steps.`;
  }
  
  // Default contextual responses (more varied and personal)
  const defaultResponses = [
    `Thanks for reaching out, ${name}! I've received your message and will get back to you via your ${contactType} with a detailed response.`,
    `Hi ${name}! Your message is important to me. I'll contact you via your ${contactType} to help you further.`,
    `Hello ${name}! I appreciate you taking the time to visit my site and connect with me. I'll follow up with you using your ${contactType} to discuss how I can assist.`,
    `${name}, thank you for your interest in my work! I'll reach out to you via your ${contactType} to provide more information and answer any questions.`,
    `Great to hear from you, ${name}! I'm reviewing your message and will contact you via your ${contactType} to provide the assistance you need.`,
    `${name}, I value your inquiry! I'll get in touch with you via your ${contactType} to discuss your requirements in detail.`
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

//press enter on keyboard and send message
addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    
    const e = document.getElementById("textInput");
    if (e === document.activeElement) {
      userResponse();
    }
  }
});
