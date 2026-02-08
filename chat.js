/**
 * PRIMEX GRUP CHAT - MAIN CHAT SCRIPT
 * Version: 9.66.0
 * Author: Epan
 * Date: 2026-02-08
 * Description: Ultimate chat functionality with all features
 */

class PrimeXChat {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.messages = [];
        this.onlineUsers = [];
        this.groups = [];
        this.conversations = [];
        this.typingUsers = new Map();
        this.selectedChat = null;
        this.mediaRecorder = null;
        this.isRecording = false;
        this.audioContext = null;
        this.isCallActive = false;
        this.peerConnection = null;
        this.localStream = null;
        this.remoteStream = null;
        this.dataChannel = null;
        this.iceCandidates = [];
        this.mediaConstraints = {
            audio: true,
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 }
            }
        };
        this.sounds = {
            message: new Audio('/assets/sounds/message.mp3'),
            notification: new Audio('/assets/sounds/notification.mp3'),
            error: new Audio('/assets/sounds/error.mp3'),
            send: new Audio('/assets/sounds/send.mp3'),
            typing: new Audio('/assets/sounds/typing.mp3'),
            login: new Audio('/assets/sounds/login.mp3'),
            logout: new Audio('/assets/sounds/logout.mp3'),
            call: new Audio('/assets/sounds/call.mp3'),
            ringtone: new Audio('/assets/sounds/ringtone.mp3'),
            alert: new Audio('/assets/sounds/alert.mp3'),
            click: new Audio('/assets/sounds/click.mp3')
        };
        this.settings = {
            sounds: true,
            notifications: true,
            vibration: true,
            theme: 'dark',
            fontSize: 'medium',
            autoDownload: false,
            enterToSend: true,
            showEmojis: true,
            showImages: true,
            messageHistory: 100
        };
        this.emojiPicker = null;
        this.fileUploader = null;
        this.voiceMessageRecorder = null;
        this.videoCallManager = null;
        this.notificationManager = null;
        this.typingTimeout = null;
        this.lastMessageTime = 0;
        this.messageQueue = [];
        this.isProcessingQueue = false;
        this.heartbeatInterval = null;
        this.reconnectionAttempts = 0;
        this.maxReconnectionAttempts = 10;
        this.reconnectionDelay = 1000;
        this.isConnected = false;
        this.isAuthenticated = false;
        this.pendingMessages = [];
        this.unreadMessages = 0;
        this.lastNotificationId = 0;
        this.mediaCache = new Map();
        this.userCache = new Map();
        this.messageCache = new Map();
        this.groupCache = new Map();
        this.typingIndicatorInterval = null;
        this.typingDotsAnimation = null;
        this.uploadProgress = new Map();
        this.downloadProgress = new Map();
        this.activeTransfers = new Set();
        this.callTimeout = null;
        this.ringtoneTimeout = null;
        this.autoScrollEnabled = true;
        this.messageBuffer = [];
        this.bufferSize = 50;
        this.bufferTimer = null;
        this.searchResults = [];
        this.isSearching = false;
        this.filteredMessages = [];
        this.selectedMessage = null;
        this.replyToMessage = null;
        this.editMessageId = null;
        this.reactionPickerOpen = false;
        this.contextMenuOpen = false;
        this.dropdownOpen = false;
        this.modalOpen = false;
        this.sidebarOpen = true;
        this.settingsOpen = false;
        this.profileOpen = false;
        this.emojiPickerOpen = false;
        this.mediaViewerOpen = false;
        this.currentMediaIndex = 0;
        this.mediaList = [];
        this.voiceMessageDuration = 0;
        this.voiceMessageTimer = null;
        this.videoCallDuration = 0;
        this.videoCallTimer = null;
        this.idleTimer = null;
        this.idleTimeout = 300000; // 5 minutes
        this.isIdle = false;
        this.awayTimer = null;
        this.awayTimeout = 900000; // 15 minutes
        this.isAway = false;
        this.typingEventSent = false;
        this.lastTypingEvent = 0;
        this.typingThrottle = 2000; // 2 seconds
        this.messageRateLimit = 10; // messages per second
        this.messageTimestamps = [];
        this.uploadRateLimit = 5; // uploads per minute
        this.uploadTimestamps = [];
        this.downloadRateLimit = 10; // downloads per minute
        this.downloadTimestamps = [];
        this.apiRateLimit = 60; // API calls per minute
        this.apiTimestamps = [];
        this.socketRateLimit = 100; // socket events per second
        this.socketTimestamps = [];
        this.errorCount = 0;
        this.maxErrorCount = 10;
        this.errorResetTime = 60000; // 1 minute
        this.lastErrorTime = 0;
        this.performanceMetrics = {
            messageSendTime: [],
            messageReceiveTime: [],
            typingLatency: [],
            connectionLatency: [],
            uploadSpeed: [],
            downloadSpeed: [],
            renderTime: [],
            memoryUsage: [],
            cpuUsage: []
        };
        this.analyticsEvents = [];
        this.userBehavior = [];
        this.pageViews = 0;
        this.sessionStart = Date.now();
        this.sessionDuration = 0;
        this.messageCount = 0;
        this.mediaCount = 0;
        this.callCount = 0;
        this.loginCount = 0;
        this.errorLog = [];
        this.warningLog = [];
        this.infoLog = [];
        this.debugLog = [];
        this.isDebugMode = false;
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.isProduction = !this.isDevelopment;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isTablet = /iPad|Android(?!.*Mobile)|Tablet|Silk/i.test(navigator.userAgent);
        this.isDesktop = !this.isMobile && !this.isTablet;
        this.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        this.isFirefox = typeof InstallTrigger !== 'undefined';
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isEdge = /Edg/.test(navigator.userAgent);
        this.isIE = /*@cc_on!@*/false || !!document.documentMode;
        this.isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        this.isBrave = navigator.brave && typeof navigator.brave.isBrave === 'function';
        this.browserVersion = this.getBrowserVersion();
        this.os = this.getOS();
        this.screenResolution = `${window.screen.width}x${window.screen.height}`;
        this.colorDepth = window.screen.colorDepth;
        this.pixelRatio = window.devicePixelRatio;
        this.language = navigator.language || navigator.userLanguage;
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.plugins = Array.from(navigator.plugins).map(p => p.name).join(', ');
        this.mimeTypes = Array.from(navigator.mimeTypes).map(mt => mt.type).join(', ');
        this.hardwareConcurrency = navigator.hardwareConcurrency;
        this.deviceMemory = navigator.deviceMemory;
        this.maxTouchPoints = navigator.maxTouchPoints;
        this.pointerType = this.getPointerType();
        this.isOnline = navigator.onLine;
        this.connectionType = this.getConnectionType();
        this.downlink = navigator.connection ? navigator.connection.downlink : 'unknown';
        this.effectiveType = navigator.connection ? navigator.connection.effectiveType : 'unknown';
        this.rtt = navigator.connection ? navigator.connection.rtt : 'unknown';
        this.saveData = navigator.connection ? navigator.connection.saveData : false;
        this.batteryLevel = null;
        this.isCharging = null;
        this.batteryChargingTime = null;
        this.batteryDischargingTime = null;
        this.deviceOrientation = null;
        this.deviceMotion = null;
        this.geolocation = null;
        this.cameraAccess = null;
        this.microphoneAccess = null;
        this.notificationPermission = Notification.permission;
        this.clipboardAccess = null;
        this.storageAccess = null;
        this.broadcastChannel = null;
        this.sharedWorker = null;
        this.serviceWorker = null;
        this.indexedDB = null;
        this.localStorage = null;
        this.sessionStorage = null;
        this.cookies = null;
        this.cacheStorage = null;
        this.webRTC = null;
        this.webGL = null;
        this.webAudio = null;
        this.webSpeech = null;
        this.webVR = null;
        this.webAR = null;
        this.webBluetooth = null;
        this.webUSB = null;
        this.webNFC = null;
        this.webHID = null;
        this.webSerial = null;
        this.webMIDI = null;
        this.gamepad = null;
        this.vibration = null;
        this.screenWakeLock = null;
        this.idleDetection = null;
        this.paymentRequest = null;
        this.credentialManagement = null;
        this.presentation = null;
        this.remotePlayback = null;
        this.pictureInPicture = null;
        this.mediaSession = null;
        this.mediaCapabilities = null;
        this.mediaDevices = null;
        this.mediaRecorder = null;
        this.mediaSource = null;
        this.encryptedMedia = null;
        this.imageCapture = null;
        this.shapeDetection = null;
        this.faceDetection = null;
        this.barcodeDetection = null;
        this.textDetection = null;
        this.webAssembly = null;
        this.webGPU = null;
        this.webTransport = null;
        this.webCodecs = null;
        this.webNN = null;
        this.websocket = null;
        this.eventsource = null;
        this.fetch = null;
        this.xhr = null;
        this.beacon = null;
        this.streams = null;
        this.webcrypto = null;
        this.performance = null;
        this.timing = null;
        this.navigation = null;
        this.resource = null;
        this.paint = null;
        this.layout = null;
        this.longtask = null;
        this.firstInput = null;
        this.largestContentfulPaint = null;
        this.cumulativeLayoutShift = null;
        this.firstContentfulPaint = null;
        this.timeToFirstByte = null;
        this.domContentLoaded = null;
        this.load = null;
        this.readyState = null;
        this.visibilityState = null;
        this.pageLifecycle = null;
        this.beforeunload = null;
        this.unload = null;
        this.pagehide = null;
        this.pageshow = null;
        this.hashchange = null;
        this.popstate = null;
        this.resize = null;
        this.scroll = null;
        this.input = null;
        this.change = null;
        this.submit = null;
        this.reset = null;
        this.focus = null;
        this.blur = null;
        this.select = null;
        this.keydown = null;
        this.keyup = null;
        this.keypress = null;
        this.click = null;
        this.dblclick = null;
        this.mousedown = null;
        this.mouseup = null;
        this.mousemove = null;
        this.mouseover = null;
        this.mouseout = null;
        this.mouseenter = null;
        this.mouseleave = null;
        this.contextmenu = null;
        this.wheel = null;
        this.dragstart = null;
        this.drag = null;
        this.dragend = null;
        this.dragenter = null;
        this.dragover = null;
        this.dragleave = null;
        this.drop = null;
        this.touchstart = null;
        this.touchmove = null;
        this.touchend = null;
        this.touchcancel = null;
        this.gotpointercapture = null;
        this.lostpointercapture = null;
        this.pointerdown = null;
        this.pointermove = null;
        this.pointerup = null;
        this.pointercancel = null;
        this.pointerover = null;
        this.pointerout = null;
        this.pointerenter = null;
        this.pointerleave = null;
        this.gesturestart = null;
        this.gesturechange = null;
        this.gestureend = null;
        this.animationstart = null;
        this.animationend = null;
        this.animationiteration = null;
        this.transitionstart = null;
        this.transitionrun = null;
        this.transitionend = null;
        this.transitioncancel = null;
        this.message = null;
        this.messageerror = null;
        this.storage = null;
        this.online = null;
        this.offline = null;
        this.languagechange = null;
        this.timezonechange = null;
        this.orientationchange = null;
        this.devicemotion = null;
        this.deviceorientation = null;
        this.vrdisplaypresentchange = null;
        this.vrdisplayconnect = null;
        this.vrdisplaydisconnect = null;
        this.vrdisplayactivate = null;
        this.vrdisplaydeactivate = null;
        this.vrdisplayblur = null;
        this.vrdisplayfocus = null;
        this.vrvideoframesubmitted = null;
        this.gamepadconnected = null;
        this.gamepaddisconnected = null;
        this.batterychargingchange = null;
        this.batterylevelchange = null;
        this.batterychargingtimechange = null;
        this.batterydischargingtimechange = null;
        this.readystatechange = null;
        this.loadstart = null;
        this.progress = null;
        this.abort = null;
        this.error = null;
        this.timeout = null;
        this.loadend = null;
        this.canplay = null;
        this.canplaythrough = null;
        this.durationchange = null;
        this.emptied = null;
        this.ended = null;
        this.loadeddata = null;
        this.loadedmetadata = null;
        this.pause = null;
        this.play = null;
        this.playing = null;
        this.ratechange = null;
        this.seeked = null;
        this.seeking = null;
        this.stalled = null;
        this.suspend = null;
        this.volumechange = null;
        this.waiting = null;
        this.complete = null;
        this.audioprocess = null;
        this.mozinterruptbegin = null;
        this.mozinterruptend = null;
        this.ended = null;
        this.nomatch = null;
        this.result = null;
        this.soundstart = null;
        this.soundend = null;
        this.speechstart = null;
        this.speechend = null;
        this.start = null;
        this.mark = null;
        this.boundary = null;
        this.resume = null;
        this.speechend = null;
        this.init();
    }

    // Initialize everything
    async init() {
        try {
            console.log('🔥 PRIMEX GRUP CHAT v9.66.0 - Initializing...');
            console.log('📅 Created: 2026-02-08');
            console.log('👨‍💻 Creator: Epan');
            console.log('💻 Environment:', this.isDevelopment ? 'Development' : 'Production');
            console.log('📱 Device:', this.isMobile ? 'Mobile' : this.isTablet ? 'Tablet' : 'Desktop');
            console.log('🌐 Browser:', this.getBrowserName(), this.browserVersion);
            console.log('💾 OS:', this.os);
            console.log('🖥️ Screen:', this.screenResolution);
            console.log('🌍 Language:', this.language);
            console.log('⏰ Timezone:', this.timezone);
            console.log('📶 Connection:', this.connectionType, this.effectiveType);
            
            // Load settings
            this.loadSettings();
            
            // Load user data
            await this.loadUserData();
            
            // Initialize UI
            this.initUI();
            
            // Initialize WebSocket connection
            this.initSocket();
            
            // Initialize event listeners
            this.initEventListeners();
            
            // Initialize media devices
            await this.initMediaDevices();
            
            // Initialize service worker
            await this.initServiceWorker();
            
            // Initialize notifications
            await this.initNotifications();
            
            // Initialize analytics
            this.initAnalytics();
            
            // Initialize performance monitoring
            this.initPerformanceMonitoring();
            
            // Initialize error handling
            this.initErrorHandling();
            
            // Initialize idle detection
            this.initIdleDetection();
            
            // Start heartbeat
            this.startHeartbeat();
            
            // Update online status
            this.updateOnlineStatus('online');
            
            console.log('✅ PRIMEX GRUP CHAT initialized successfully!');
            console.log('🔥 Current User:', this.currentUser);
            console.log('🔗 Socket Connected:', this.isConnected);
            console.log('🔐 Authenticated:', this.isAuthenticated);
            
            // Play login sound
            this.playSound('login');
            
            // Show welcome message
            this.showNotification('Welcome to PrimeX Grup!', 'success');
            
            // Log session start
            this.logEvent('session_start', {
                duration: Date.now() - this.sessionStart,
                user: this.currentUser,
                device: this.getDeviceInfo(),
                connection: this.getConnectionInfo()
            });
            
        } catch (error) {
            console.error('💀 Initialization error:', error);
            this.handleError(error, 'init');
            this.showError('Failed to initialize chat. Please refresh the page.');
        }
    }

    // Load user data from localStorage
    async loadUserData() {
        try {
            const userData = localStorage.getItem('primex_user');
            const sessionData = localStorage.getItem('primex_session');
            const settingsData = localStorage.getItem('primex_settings');
            
            if (userData) {
                this.currentUser = JSON.parse(userData);
                console.log('👤 User loaded from localStorage:', this.currentUser.username);
            } else {
                // Redirect to login if no user data
                window.location.href = '/login.html';
                return;
            }
            
            if (sessionData) {
                const session = JSON.parse(sessionData);
                if (session.expires > Date.now()) {
                    this.sessionStart = session.start;
                } else {
                    // Session expired
                    localStorage.removeItem('primex_user');
                    localStorage.removeItem('primex_session');
                    window.location.href = '/login.html?session=expired';
                    return;
                }
            }
            
            if (settingsData) {
                this.settings = { ...this.settings, ...JSON.parse(settingsData) };
                console.log('⚙️ Settings loaded:', this.settings);
            }
            
            // Apply theme
            this.applyTheme(this.settings.theme);
            
            // Apply font size
            this.applyFontSize(this.settings.fontSize);
            
        } catch (error) {
            console.error('💀 Error loading user data:', error);
            throw error;
        }
    }

    // Initialize WebSocket connection
    initSocket() {
        try {
            console.log('🔗 Initializing WebSocket connection...');
            
            // Connect to Socket.IO server
            this.socket = io({
                transports: ['websocket', 'polling'],
                upgrade: true,
                rememberUpgrade: true,
                reconnection: true,
                reconnectionAttempts: this.maxReconnectionAttempts,
                reconnectionDelay: this.reconnectionDelay,
                reconnectionDelayMax: 5000,
                randomizationFactor: 0.5,
                timeout: 20000,
                autoConnect: true,
                forceNew: false,
                multiplex: true,
                agent: false,
                perMessageDeflate: false,
                withCredentials: true,
                extraHeaders: {},
                auth: {
                    token: localStorage.getItem('primex_token'),
                    userId: this.currentUser?.userId
                }
            });
            
            // Socket event listeners
            this.socket.on('connect', () => this.onSocketConnect());
            this.socket.on('disconnect', (reason) => this.onSocketDisconnect(reason));
            this.socket.on('connect_error', (error) => this.onSocketConnectError(error));
            this.socket.on('reconnect', (attempt) => this.onSocketReconnect(attempt));
            this.socket.on('reconnect_attempt', (attempt) => this.onSocketReconnectAttempt(attempt));
            this.socket.on('reconnecting', (attempt) => this.onSocketReconnecting(attempt));
            this.socket.on('reconnect_error', (error) => this.onSocketReconnectError(error));
            this.socket.on('reconnect_failed', () => this.onSocketReconnectFailed());
            this.socket.on('ping', () => this.onSocketPing());
            this.socket.on('pong', (latency) => this.onSocketPong(latency));
            this.socket.on('error', (error) => this.onSocketError(error));
            
            // Custom event listeners
            this.socket.on('authenticated', (data) => this.onAuthenticated(data));
            this.socket.on('unauthorized', (data) => this.onUnauthorized(data));
            this.socket.on('user_online', (data) => this.onUserOnline(data));
            this.socket.on('user_offline', (data) => this.onUserOffline(data));
            this.socket.on('user_typing', (data) => this.onUserTyping(data));
            this.socket.on('user_stopped_typing', (data) => this.onUserStoppedTyping(data));
            this.socket.on('user_status_change', (data) => this.onUserStatusChange(data));
            this.socket.on('user_profile_update', (data) => this.onUserProfileUpdate(data));
            this.socket.on('message_receive', (data) => this.onMessageReceive(data));
            this.socket.on('message_delivered', (data) => this.onMessageDelivered(data));
            this.socket.on('message_read', (data) => this.onMessageRead(data));
            this.socket.on('message_delete', (data) => this.onMessageDelete(data));
            this.socket.on('message_edit', (data) => this.onMessageEdit(data));
            this.socket.on('message_reaction', (data) => this.onMessageReaction(data));
            this.socket.on('group_join', (data) => this.onGroupJoin(data));
            this.socket.on('group_leave', (data) => this.onGroupLeave(data));
            this.socket.on('group_update', (data) => this.onGroupUpdate(data));
            this.socket.on('group_member_add', (data) => this.onGroupMemberAdd(data));
            this.socket.on('group_member_remove', (data) => this.onGroupMemberRemove(data));
            this.socket.on('group_message', (data) => this.onGroupMessage(data));
            this.socket.on('call_initiate', (data) => this.onCallInitiate(data));
            this.socket.on('call_accept', (data) => this.onCallAccept(data));
            this.socket.on('call_reject', (data) => this.onCallReject(data));
            this.socket.on('call_end', (data) => this.onCallEnd(data));
            this.socket.on('call_offer', (data) => this.onCallOffer(data));
            this.socket.on('call_answer', (data) => this.onCallAnswer(data));
            this.socket.on('call_ice_candidate', (data) => this.onCallIceCandidate(data));
            this.socket.on('notification_new', (data) => this.onNotificationNew(data));
            this.socket.on('notification_read', (data) => this.onNotificationRead(data));
            this.socket.on('notification_delete', (data) => this.onNotificationDelete(data));
            this.socket.on('ping', () => this.onPing());
            this.socket.on('pong', (latency) => this.onPong(latency));
            this.socket.on('error', (data) => this.onError(data));
            this.socket.on('warning', (data) => this.onWarning(data));
            this.socket.on('info', (data) => this.onInfo(data));
            this.socket.on('maintenance', (data) => this.onMaintenance(data));
            
            console.log('✅ Socket event listeners initialized');
            
        } catch (error) {
            console.error('💀 Error initializing socket:', error);
            throw error;
        }
    }

    // Socket connected
    onSocketConnect() {
        console.log('✅ Socket connected:', this.socket.id);
        this.isConnected = true;
        this.reconnectionAttempts = 0;
        
        // Update UI
        this.updateConnectionStatus('connected');
        
        // Authenticate
        this.authenticate();
        
        // Join group
        this.joinGroup('PrimeX Grup');
        
        // Start typing indicator interval
        this.startTypingIndicator();
        
        // Log connection
        this.logEvent('socket_connect', {
            socketId: this.socket.id,
            timestamp: Date.now(),
            reconnectionAttempts: this.reconnectionAttempts
        });
    }

    // Authenticate with server
    authenticate() {
        if (!this.currentUser || !this.socket.connected) return;
        
        const authData = {
            userId: this.currentUser.userId,
            username: this.currentUser.username,
            displayName: this.currentUser.displayName,
            avatar: this.currentUser.avatar,
            token: localStorage.getItem('primex_token'),
            deviceInfo: this.getDeviceInfo(),
            timestamp: Date.now()
        };
        
        this.socket.emit('authenticate', authData);
        console.log('🔐 Authenticating...');
    }

    // Authentication successful
    onAuthenticated(data) {
        console.log('✅ Authenticated:', data);
        this.isAuthenticated = true;
        this.currentUser = { ...this.currentUser, ...data.user };
        
        // Update UI
        this.updateUserProfile();
        
        // Load messages
        this.loadMessages();
        
        // Load online users
        this.loadOnlineUsers();
        
        // Load groups
        this.loadGroups();
        
        // Load conversations
        this.loadConversations();
        
        // Play sound
        this.playSound('login');
        
        // Show notification
        this.showNotification('Successfully connected to PrimeX Grup!', 'success');
        
        // Log event
        this.logEvent('authenticated', {
            userId: this.currentUser.userId,
            timestamp: Date.now()
        });
    }

    // Send message
    async sendMessage(content, type = 'text', options = {}) {
        try {
            if (!this.isAuthenticated || !this.socket.connected) {
                throw new Error('Not authenticated or socket disconnected');
            }
            
            // Rate limiting
            const now = Date.now();
            this.messageTimestamps = this.messageTimestamps.filter(ts => now - ts < 1000);
            if (this.messageTimestamps.length >= this.messageRateLimit) {
                throw new Error('Message rate limit exceeded');
            }
            this.messageTimestamps.push(now);
            
            // Create message object
            const message = {
                id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                userId: this.currentUser.userId,
                username: this.currentUser.username,
                displayName: this.currentUser.displayName,
                avatar: this.currentUser.avatar,
                content: content,
                type: type,
                timestamp: Date.now(),
                status: 'sending',
                options: options
            };
            
            // Add to messages array
            this.messages.push(message);
            
            // Update UI immediately
            this.renderMessage(message);
            
            // Scroll to bottom
            this.scrollToBottom();
            
            // Play send sound
            this.playSound('send');
            
            // Send via socket
            this.socket.emit('message_send', {
                ...message,
                socketId: this.socket.id,
                groupId: 'PrimeX Grup'
            });
            
            // Update message count
            this.messageCount++;
            
            // Log event
            this.logEvent('message_send', {
                messageId: message.id,
                type: type,
                length: content.length,
                timestamp: message.timestamp
            });
            
            // Update last activity
            this.updateLastActivity();
            
            return message;
            
        } catch (error) {
            console.error('💀 Error sending message:', error);
            this.handleError(error, 'sendMessage');
            this.showError('Failed to send message: ' + error.message);
            throw error;
        }
    }

    // Render message in UI
    renderMessage(message) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.userId === this.currentUser.userId ? 'message-outgoing' : 'message-incoming'}`;
        messageElement.id = `message-${message.id}`;
        messageElement.dataset.messageId = message.id;
        
        // Message bubble
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // Avatar
        if (message.userId !== this.currentUser.userId) {
            const avatar = document.createElement('img');
            avatar.className = 'message-avatar';
            avatar.src = message.avatar || '/assets/images/default-avatar.png';
            avatar.alt = message.displayName;
            avatar.onclick = () => this.showUserProfile(message.userId);
            messageElement.appendChild(avatar);
        }
        
        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'message-content';
        
        // Display name (for incoming messages)
        if (message.userId !== this.currentUser.userId) {
            const nameElement = document.createElement('div');
            nameElement.className = 'message-sender';
            nameElement.textContent = message.displayName;
            nameElement.onclick = () => this.showUserProfile(message.userId);
            contentContainer.appendChild(nameElement);
        }
        
        // Message content based on type
        switch (message.type) {
            case 'text':
                const textElement = document.createElement('div');
                textElement.className = 'message-text';
                textElement.innerHTML = this.formatMessageContent(message.content);
                contentContainer.appendChild(textElement);
                break;
                
            case 'image':
                const imageElement = document.createElement('img');
                imageElement.className = 'message-image';
                imageElement.src = message.content;
                imageElement.alt = 'Image message';
                imageElement.loading = 'lazy';
                imageElement.onclick = () => this.openMediaViewer(message.content, 'image');
                contentContainer.appendChild(imageElement);
                break;
                
            case 'video':
                const videoElement = document.createElement('video');
                videoElement.className = 'message-video';
                videoElement.src = message.content;
                videoElement.controls = true;
                videoElement.preload = 'metadata';
                contentContainer.appendChild(videoElement);
                break;
                
            case 'audio':
                const audioElement = document.createElement('audio');
                audioElement.className = 'message-audio';
                audioElement.src = message.content;
                audioElement.controls = true;
                audioElement.preload = 'metadata';
                contentContainer.appendChild(audioElement);
                break;
                
            case 'file':
                const fileElement = document.createElement('div');
                fileElement.className = 'message-file';
                fileElement.innerHTML = `
                    <i class="fas fa-file"></i>
                    <div class="file-info">
                        <div class="file-name">${message.options.fileName || 'File'}</div>
                        <div class="file-size">${this.formatFileSize(message.options.fileSize || 0)}</div>
                    </div>
                    <a href="${message.content}" download class="file-download">
                        <i class="fas fa-download"></i>
                    </a>
                `;
                contentContainer.appendChild(fileElement);
                break;
                
            default:
                const defaultElement = document.createElement('div');
                defaultElement.className = 'message-text';
                defaultElement.textContent = message.content;
                contentContainer.appendChild(defaultElement);
        }
        
        // Timestamp
        const timeElement = document.createElement('div');
        timeElement.className = 'message-time';
        timeElement.textContent = this.formatTime(message.timestamp);
        
        // Status indicator (for outgoing messages)
        if (message.userId === this.currentUser.userId) {
            const statusElement = document.createElement('div');
            statusElement.className = 'message-status';
            statusElement.innerHTML = this.getMessageStatusIcon(message.status);
            contentContainer.appendChild(statusElement);
        }
        
        contentContainer.appendChild(timeElement);
        bubble.appendChild(contentContainer);
        messageElement.appendChild(bubble);
        
        // Context menu
        messageElement.oncontextmenu = (e) => {
            e.preventDefault();
            this.showMessageContextMenu(e, message);
        };
        
        messagesContainer.appendChild(messageElement);
        
        // Add animation
        messageElement.classList.add('message-animate');
        setTimeout(() => {
            messageElement.classList.remove('message-animate');
        }, 300);
    }

    // Format message content (emojis, links, etc.)
    formatMessageContent(content) {
        if (!content) return '';
        
        let formatted = content;
        
        // Convert URLs to links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        formatted = formatted.replace(urlRegex, url => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="message-link">${url}</a>`;
        });
        
        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Basic emoji support (you can expand this)
        const emojiMap = {
            ':)': '😊',
            ':(': '😔',
            ':D': '😃',
            ':P': '😛',
            ';)': '😉',
            ':*': '😘',
            ':|': '😐',
            ':\\': '😕',
            ':\'(': '😢',
            '>:(': '😠',
            '<3': '❤️',
            '</3': '💔',
            ':O': '😮',
            ':\\': '😕',
            ':/': '😕',
            ':3': '😸',
            '^^': '😊',
            '^_^': '😊',
            '-_-': '😑',
            'o.O': '😕',
            'O.o': '😕',
            '>:O': '😠',
            '>:\\': '😠',
            '>:(': '😠',
            '>:D': '😈',
            '>:P': '😛',
            '>:3': '😼',
            '>:\\\\': '😠',
            '>:/': '😠',
            ':|': '😐',
            ':S': '😕',
            ':X': '😷',
            ':B': '😎',
            '8)': '😎',
            '8D': '😃',
            '8P': '😛',
            '8O': '😮',
            '8|': '😐',
            '8\\': '😕',
            '8/': '😕',
            '8:(': '😢',
            '8>:(': '😠',
            '8<3': '❤️',
            '8</3': '💔',
            '8:O': '😮',
            '8:\\': '😕',
            '8:/': '😕',
            '8:3': '😸',
            '8^^': '😊',
            '8^_^': '😊',
            '8-_-': '😑',
            '8o.O': '😕',
            '8O.o': '😕',
            '8>:O': '😠',
            '8>:\\': '😠',
            '8>:(': '😠',
            '8>:D': '😈',
            '8>:P': '😛',
            '8>:3': '😼',
            '8>:\\\\': '😠',
            '8>:/': '😠'
        };
        
        Object.keys(emojiMap).forEach(emoji => {
            const regex = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            formatted = formatted.replace(regex, emojiMap[emoji]);
        });
        
        // Escape HTML (except for our formatted elements)
        formatted = formatted.replace(/&/g, '&amp;')
                           .replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;')
                           .replace(/"/g, '&quot;')
                           .replace(/'/g, '&#039;');
        
        // Restore our links
        formatted = formatted.replace(/&lt;a href=&quot;(.*?)&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; class=&quot;message-link&quot;&gt;(.*?)&lt;\/a&gt;/g, 
            (match, url, text) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="message-link">${text}</a>`);
        
        return formatted;
    }

    // Format time
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        // Less than 1 minute
        if (diff < 60000) {
            return 'Just now';
        }
        
        // Less than 1 hour
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes}m ago`;
        }
        
        // Less than 1 day
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours}h ago`;
        }
        
        // More than 1 day
        const days = Math.floor(diff / 86400000);
        return `${days}d ago`;
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Get message status icon
    getMessageStatusIcon(status) {
        switch (status) {
            case 'sending':
                return '<i class="fas fa-clock message-status-sending"></i>';
            case 'sent':
                return '<i class="fas fa-check message-status-sent"></i>';
            case 'delivered':
                return '<i class="fas fa-check-double message-status-delivered"></i>';
            case 'read':
                return '<i class="fas fa-check-double message-status-read"></i>';
            case 'failed':
                return '<i class="fas fa-exclamation-circle message-status-failed"></i>';
            default:
                return '';
        }
    }

    // Play sound
    playSound(soundName) {
        if (!this.settings.sounds || !this.sounds[soundName]) return;
        
        try {
            const sound = this.sounds[soundName];
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.log('Sound play failed:', e);
            });
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        if (!this.settings.notifications) return;
        
        const notificationId = ++this.lastNotificationId;
        const notification = document.createElement('div');
        notification.id = `notification-${notificationId}`;
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                </div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" onclick="primexChat.closeNotification(${notificationId})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const container = document.getElementById('notificationContainer') || this.createNotificationContainer();
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.closeNotification(notificationId);
        }, 5000);
        
        // Play sound
        if (type === 'error') {
            this.playSound('error');
        } else if (type === 'success') {
            this.playSound('send');
        }
        
        // Vibration
        if (this.settings.vibration && 'vibrate' in navigator) {
            navigator.vibrate(200);
        }
        
        return notificationId;
    }

    // Close notification
    closeNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.add('notification-hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    // Create notification container
    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }

    // Show error
    showError(message) {
        this.showNotification(message, 'error');
        
        // Flash red animation
        const errorElement = document.getElementById('errorFlash');
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.style.opacity = '1';
            setTimeout(() => {
                errorElement.style.opacity = '0';
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        // Play error sound
        this.playSound('error');
    }

    // Handle error
    handleError(error, context = 'unknown') {
        console.error(`💀 Error in ${context}:`, error);
        
        this.errorCount++;
        this.lastErrorTime = Date.now();
        
        // Log error
        this.errorLog.push({
            timestamp: Date.now(),
            context: context,
            error: error.message,
            stack: error.stack,
            user: this.currentUser?.userId,
            url: window.location.href
        });
        
        // Send error to server (if connected)
        if (this.socket?.connected) {
            this.socket.emit('error', {
                type: 'client_error',
                context: context,
                message: error.message,
                stack: error.stack,
                timestamp: Date.now(),
                user: this.currentUser?.userId
            });
        }
        
        // Reset error count after timeout
        if (this.errorCount >= this.maxErrorCount) {
            setTimeout(() => {
                this.errorCount = 0;
            }, this.errorResetTime);
        }
        
        return error;
    }

    // Log event for analytics
    logEvent(eventName, data = {}) {
        const event = {
            event: eventName,
            timestamp: Date.now(),
            user: this.currentUser?.userId,
            session: this.sessionStart,
            ...data
        };
        
        this.analyticsEvents.push(event);
        
        // Send to server if connected
        if (this.socket?.connected && this.isAuthenticated) {
            this.socket.emit('analytics_event', event);
        }
        
        // Store in localStorage (limited to 100 events)
        if (this.analyticsEvents.length > 100) {
            this.analyticsEvents = this.analyticsEvents.slice(-100);
        }
        
        // Update localStorage occasionally
        if (Math.random() < 0.1) { // 10% chance
            localStorage.setItem('primex_analytics', JSON.stringify(this.analyticsEvents.slice(-50)));
        }
        
        return event;
    }

    // Get device info
    getDeviceInfo() {
        return {
            platform: this.os,
            browser: this.getBrowserName(),
            version: this.browserVersion,
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            isDesktop: this.isDesktop,
            screenResolution: this.screenResolution,
            colorDepth: this.colorDepth,
            pixelRatio: this.pixelRatio,
            language: this.language,
            timezone: this.timezone,
            hardwareConcurrency: this.hardwareConcurrency,
            deviceMemory: this.deviceMemory,
            maxTouchPoints: this.maxTouchPoints,
            pointerType: this.pointerType,
            userAgent: navigator.userAgent.substring(0, 200) // Limit length
        };
    }

    // Get connection info
    getConnectionInfo() {
        return {
            isOnline: this.isOnline,
            type: this.connectionType,
            effectiveType: this.effectiveType,
            downlink: this.downlink,
            rtt: this.rtt,
            saveData: this.saveData
        };
    }

    // Get browser name
    getBrowserName() {
        if (this.isChrome) return 'Chrome';
        if (this.isFirefox) return 'Firefox';
        if (this.isSafari) return 'Safari';
        if (this.isEdge) return 'Edge';
        if (this.isIE) return 'Internet Explorer';
        if (this.isOpera) return 'Opera';
        if (this.isBrave) return 'Brave';
        return 'Unknown';
    }

    // Get browser version
    getBrowserVersion() {
        const userAgent = navigator.userAgent;
        let version = 'unknown';
        
        if (this.isChrome) {
            const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
            version = match ? match[1] : 'unknown';
        } else if (this.isFirefox) {
            const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
            version = match ? match[1] : 'unknown';
        } else if (this.isSafari) {
            const match = userAgent.match(/Version\/(\d+\.\d+)/);
            version = match ? match[1] : 'unknown';
        } else if (this.isEdge) {
            const match = userAgent.match(/Edg\/(\d+\.\d+)/);
            version = match ? match[1] : 'unknown';
        }
        
        return version;
    }

    // Get OS
    getOS() {
        const userAgent = navigator.userAgent;
        let os = 'Unknown OS';
        
        if (userAgent.indexOf('Win') !== -1) os = 'Windows';
        if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
        if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
        if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
        if (userAgent.indexOf('Android') !== -1) os = 'Android';
        if (userAgent.indexOf('iOS') !== -1) os = 'iOS';
        if (userAgent.indexOf('CrOS') !== -1) os = 'ChromeOS';
        
        return os;
    }

    // Get pointer type
    getPointerType() {
        if (this.isMobile) return 'touch';
        if (this.isTablet) return 'touch';
        if (window.matchMedia('(pointer: coarse)').matches) return 'coarse';
        if (window.matchMedia('(pointer: fine)').matches) return 'fine';
        return 'unknown';
    }

    // Get connection type
    getConnectionType() {
        if (!navigator.connection) return 'unknown';
        return navigator.connection.type || 'unknown';
    }

    // Apply theme
    applyTheme(theme) {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        document.body.classList.add(this.isMobile ? 'mobile' : 'desktop');
        
        // Update CSS variables
        const root = document.documentElement;
        const themes = {
            dark: {
                '--primary': '#ff2a6d',
                '--secondary': '#05d9e8',
                '--background': '#0c0e1c',
                '--surface': '#1a1d3a',
                '--text': '#ffffff',
                '--text-secondary': '#b0b0b0'
            },
            light: {
                '--primary': '#007bff',
                '--secondary': '#6c757d',
                '--background': '#ffffff',
                '--surface': '#f8f9fa',
                '--text': '#212529',
                '--text-secondary': '#6c757d'
            },
            matrix: {
                '--primary': '#00ff41',
                '--secondary': '#008f11',
                '--background': '#0a0a0a',
                '--surface': '#1a1a1a',
                '--text': '#00ff41',
                '--text-secondary': '#008f11'
            },
            cyber: {
                '--primary': '#ff2a6d',
                '--secondary': '#05d9e8',
                '--background': '#0c0e1c',
                '--surface': '#1a1d3a',
                '--text': '#d1f7ff',
                '--text-secondary': '#05d9e8'
            },
            purple: {
                '--primary': '#9d4edd',
                '--secondary': '#c77dff',
                '--background': '#10002b',
                '--surface': '#240046',
                '--text': '#e0aaff',
                '--text-secondary': '#c77dff'
            }
        };
        
        const themeColors = themes[theme] || themes.dark;
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    // Apply font size
    applyFontSize(size) {
        const sizes = {
            small: '12px',
            medium: '14px',
            large: '16px'
        };
        document.documentElement.style.fontSize = sizes[size] || sizes.medium;
    }

    // Update online status
    updateOnlineStatus(status) {
        if (!this.currentUser || !this.socket?.connected) return;
        
        this.currentUser.status = status;
        this.socket.emit('user_status_change', {
            userId: this.currentUser.userId,
            status: status,
            timestamp: Date.now()
        });
        
        // Update UI
        const statusElement = document.getElementById('userStatus');
        if (statusElement) {
            statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            statusElement.className = `status status-${status}`;
        }
    }

    // Update last activity
    updateLastActivity() {
        this.currentUser.lastActivity = Date.now();
        
        // Reset idle timer
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }
        
        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.updateOnlineStatus('away');
        }, this.idleTimeout);
        
        // Reset away timer
        if (this.awayTimer) {
            clearTimeout(this.awayTimer);
        }
        
        this.awayTimer = setTimeout(() => {
            this.isAway = true;
            this.updateOnlineStatus('away');
        }, this.awayTimeout);
    }

    // Start heartbeat
    startHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
        
        this.heartbeatInterval = setInterval(() => {
            if (this.socket?.connected) {
                this.socket.emit('ping', Date.now());
            }
        }, 30000); // Every 30 seconds
    }

    // Scroll to bottom
    scrollToBottom() {
        if (!this.autoScrollEnabled) return;
        
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Load messages from server
    async loadMessages() {
        try {
            const response = await fetch('/api/v1/chat/messages?limit=100');
            if (!response.ok) throw new Error('Failed to load messages');
            
            const messages = await response.json();
            this.messages = messages;
            
            // Render messages
            this.renderMessages();
            
            // Scroll to bottom
            setTimeout(() => this.scrollToBottom(), 100);
            
            console.log(`📨 Loaded ${messages.length} messages`);
            
        } catch (error) {
            console.error('💀 Error loading messages:', error);
            this.showError('Failed to load messages');
        }
    }

    // Render all messages
    renderMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        // Clear container
        messagesContainer.innerHTML = '';
        
        // Render each message
        this.messages.forEach(message => {
            this.renderMessage(message);
        });
    }

    // Load online users
    async loadOnlineUsers() {
        try {
            const response = await fetch('/api/v1/users/online');
            if (!response.ok) throw new Error('Failed to load online users');
            
            this.onlineUsers = await response.json();
            this.renderOnlineUsers();
            
            console.log(`👥 Loaded ${this.onlineUsers.length} online users`);
            
        } catch (error) {
            console.error('💀 Error loading online users:', error);
        }
    }

    // Render online users
    renderOnlineUsers() {
        const onlineUsersContainer = document.getElementById('onlineUsers');
        if (!onlineUsersContainer) return;
        
        onlineUsersContainer.innerHTML = '';
        
        this.onlineUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'online-user';
            userElement.innerHTML = `
                <img src="${user.avatar}" alt="${user.displayName}" class="user-avatar">
                <div class="user-info">
                    <div class="user-name">${user.displayName}</div>
                    <div class="user-status status-${user.status}">${user.status}</div>
                </div>
            `;
            userElement.onclick = () => this.startPrivateChat(user.userId);
            onlineUsersContainer.appendChild(userElement);
        });
    }

    // Start private chat
    startPrivateChat(userId) {
        // Implement private chat functionality
        console.log('Starting private chat with:', userId);
        this.showNotification('Private chat feature coming soon!', 'info');
    }

    // Load groups
    async loadGroups() {
        try {
            const response = await fetch('/api/v1/groups');
            if (!response.ok) throw new Error('Failed to load groups');
            
            this.groups = await response.json();
            this.renderGroups();
            
            console.log(`👥 Loaded ${this.groups.length} groups`);
            
        } catch (error) {
            console.error('💀 Error loading groups:', error);
        }
    }

    // Render groups
    renderGroups() {
        const groupsContainer = document.getElementById('groupsList');
        if (!groupsContainer) return;
        
        groupsContainer.innerHTML = '';
        
        this.groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group-item';
            groupElement.innerHTML = `
                <img src="${group.avatar}" alt="${group.name}" class="group-avatar">
                <div class="group-info">
                    <div class="group-name">${group.name}</div>
                    <div class="group-members">${group.memberCount} members</div>
                </div>
            `;
            groupElement.onclick = () => this.selectGroup(group.id);
            groupsContainer.appendChild(groupElement);
        });
    }

    // Select group
    selectGroup(groupId) {
        this.selectedChat = { type: 'group', id: groupId };
        // Implement group selection logic
        console.log('Selected group:', groupId);
    }

    // Load conversations
    async loadConversations() {
        try {
            const response = await fetch('/api/v1/chat/conversations');
            if (!response.ok) throw new Error('Failed to load conversations');
            
            this.conversations = await response.json();
            this.renderConversations();
            
            console.log(`💬 Loaded ${this.conversations.length} conversations`);
            
        } catch (error) {
            console.error('💀 Error loading conversations:', error);
        }
    }

    // Render conversations
    renderConversations() {
        const conversationsContainer = document.getElementById('conversationsList');
        if (!conversationsContainer) return;
        
        conversationsContainer.innerHTML = '';
        
        this.conversations.forEach(conversation => {
            const conversationElement = document.createElement('div');
            conversationElement.className = 'conversation-item';
            conversationElement.innerHTML = `
                <img src="${conversation.avatar}" alt="${conversation.name}" class="conversation-avatar">
                <div class="conversation-info">
                    <div class="conversation-name">${conversation.name}</div>
                    <div class="conversation-last-message">${conversation.lastMessage}</div>
                    <div class="conversation-time">${this.formatTime(conversation.lastMessageTime)}</div>
                </div>
                ${conversation.unreadCount > 0 ? `<div class="conversation-unread">${conversation.unreadCount}</div>` : ''}
            `;
            conversationElement.onclick = () => this.selectConversation(conversation.id);
            conversationsContainer.appendChild(conversationElement);
        });
    }

    // Select conversation
    selectConversation(conversationId) {
        this.selectedChat = { type: 'conversation', id: conversationId };
        // Implement conversation selection logic
        console.log('Selected conversation:', conversationId);
    }

    // Join group
    joinGroup(groupName) {
        if (!this.socket?.connected) return;
        
        this.socket.emit('group_join', {
            groupId: groupName,
            userId: this.currentUser.userId,
            timestamp: Date.now()
        });
        
        console.log(`👥 Joining group: ${groupName}`);
    }

    // Start typing indicator
    startTypingIndicator() {
        if (this.typingIndicatorInterval) {
            clearInterval(this.typingIndicatorInterval);
        }
        
        this.typingIndicatorInterval = setInterval(() => {
            this.updateTypingDots();
        }, 300);
    }

    // Update typing dots animation
    updateTypingDots() {
        const typingIndicators = document.querySelectorAll('.typing-dots .typing-dot');
        typingIndicators.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Show typing indicator for user
    showTypingIndicator(userId, userName) {
        const typingContainer = document.getElementById('typingIndicators');
        if (!typingContainer) return;
        
        // Check if already showing
        if (this.typingUsers.has(userId)) return;
        
        this.typingUsers.set(userId, userName);
        
        const indicator = document.createElement('div');
        indicator.id = `typing-${userId}`;
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <img src="${this.getUserAvatar(userId)}" alt="${userName}" class="typing-avatar">
            <div class="typing-info">
                <div class="typing-name">${userName}</div>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        typingContainer.appendChild(indicator);
        
        // Play typing sound
        this.playSound('typing');
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.hideTypingIndicator(userId);
        }, 5000);
    }

    // Hide typing indicator
    hideTypingIndicator(userId) {
        if (this.typingUsers.has(userId)) {
            this.typingUsers.delete(userId);
            const indicator = document.getElementById(`typing-${userId}`);
            if (indicator) {
                indicator.remove();
            }
        }
    }

    // Get user avatar
    getUserAvatar(userId) {
        // Try to get from cache
        if (this.userCache.has(userId)) {
            return this.userCache.get(userId).avatar;
        }
        
        // Try to get from online users
        const onlineUser = this.onlineUsers.find(u => u.userId === userId);
        if (onlineUser) {
            return onlineUser.avatar;
        }
        
        // Default avatar
        return '/assets/images/default-avatar.png';
    }

    // Show user profile
    showUserProfile(userId) {
        // Implement user profile modal
        console.log('Showing profile for user:', userId);
        this.showNotification('User profile feature coming soon!', 'info');
    }

    // Show message context menu
    showMessageContextMenu(event, message) {
        event.preventDefault();
        
        // Remove any existing context menu
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'absolute';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        
        const isOwnMessage = message.userId === this.currentUser.userId;
        
        menu.innerHTML = `
            <ul class="context-menu-list">
                <li><button onclick="primexChat.copyMessage('${message.id}')"><i class="fas fa-copy"></i> Copy</button></li>
                <li><button onclick="primexChat.replyToMessage('${message.id}')"><i class="fas fa-reply"></i> Reply</button></li>
                ${isOwnMessage ? `
                    <li><button onclick="primexChat.editMessage('${message.id}')"><i class="fas fa-edit"></i> Edit</button></li>
                    <li><button onclick="primexChat.deleteMessage('${message.id}')" class="danger"><i class="fas fa-trash"></i> Delete</button></li>
                ` : ''}
                <li><button onclick="primexChat.reportMessage('${message.id}')"><i class="fas fa-flag"></i> Report</button></li>
                <li><button onclick="primexChat.saveMessage('${message.id}')"><i class="fas fa-save"></i> Save</button></li>
            </ul>
        `;
        
        document.body.appendChild(menu);
        
        // Close menu when clicking elsewhere
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 100);
        
        return menu;
    }

    // Copy message
    copyMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            navigator.clipboard.writeText(message.content).then(() => {
                this.showNotification('Message copied to clipboard!', 'success');
            }).catch(err => {
                this.showError('Failed to copy message');
            });
        }
    }

    // Reply to message
    replyToMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            this.replyToMessage = message;
            
            // Show reply indicator in input
            const input = document.getElementById('messageInput');
            if (input) {
                input.placeholder = `Replying to ${message.displayName}...`;
                input.focus();
            }
            
            this.showNotification(`Replying to ${message.displayName}`, 'info');
        }
    }

    // Edit message
    editMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            this.editMessageId = messageId;
            
            // Set message content to input
            const input = document.getElementById('messageInput');
            if (input) {
                input.value = message.content;
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
            
            this.showNotification('Editing message...', 'info');
        }
    }

    // Delete message
    async deleteMessage(messageId) {
        if (!confirm('Are you sure you want to delete this message?')) return;
        
        try {
            const response = await fetch(`/api/v1/chat/delete/${messageId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete message');
            
            // Remove from local array
            this.messages = this.messages.filter(m => m.id !== messageId);
            
            // Remove from UI
            const messageElement = document.getElementById(`message-${messageId}`);
            if (messageElement) {
                messageElement.remove();
            }
            
            this.showNotification('Message deleted', 'success');
            
        } catch (error) {
            console.error('💀 Error deleting message:', error);
            this.showError('Failed to delete message');
        }
    }

    // Report message
    reportMessage(messageId) {
        const reason = prompt('Please enter the reason for reporting this message:');
        if (reason) {
            // Send report to server
            this.socket.emit('message_report', {
                messageId: messageId,
                reason: reason,
                timestamp: Date.now(),
                reporterId: this.currentUser.userId
            });
            
            this.showNotification('Message reported. Thank you!', 'success');
        }
    }

    // Save message
    saveMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            // Save to localStorage
            const savedMessages = JSON.parse(localStorage.getItem('primex_saved_messages') || '[]');
            savedMessages.push({
                ...message,
                savedAt: Date.now()
            });
            localStorage.setItem('primex_saved_messages', JSON.stringify(savedMessages.slice(-100))); // Keep last 100
            
            this.showNotification('Message saved!', 'success');
        }
    }

    // Open media viewer
    openMediaViewer(mediaUrl, type) {
        this.mediaViewerOpen = true;
        this.currentMediaIndex = 0;
        this.mediaList = [{ url: mediaUrl, type: type }];
        
        // Create media viewer modal
        const modal = document.createElement('div');
        modal.id = 'mediaViewer';
        modal.className = 'media-viewer';
        modal.innerHTML = `
            <div class="media-viewer-content">
                <button class="media-viewer-close" onclick="primexChat.closeMediaViewer()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="media-container">
                    ${type === 'image' ? 
                        `<img src="${mediaUrl}" alt="Media" class="media-image">` :
                        type === 'video' ?
                        `<video src="${mediaUrl}" controls autoplay class="media-video"></video>` :
                        `<audio src="${mediaUrl}" controls autoplay class="media-audio"></audio>`
                    }
                </div>
                <div class="media-info">
                    <a href="${mediaUrl}" download class="media-download">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMediaViewer();
            }
        });
    }

    // Close media viewer
    closeMediaViewer() {
        this.mediaViewerOpen = false;
        const modal = document.getElementById('mediaViewer');
        if (modal) {
            modal.remove();
        }
    }

    // Upload file
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            // Show upload progress
            const progressId = `upload-${Date.now()}`;
            this.showUploadProgress(progressId, file.name, 0);
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/v1/media/upload');
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('primex_token')}`);
            
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    this.updateUploadProgress(progressId, percent);
                }
            };
            
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    this.completeUploadProgress(progressId, true);
                    
                    // Send as message
                    const fileType = file.type.split('/')[0];
                    this.sendMessage(response.url, fileType, {
                        fileName: file.name,
                        fileSize: file.size,
                        mimeType: file.type
                    });
                    
                } else {
                    this.completeUploadProgress(progressId, false);
                    this.showError('Upload failed');
                }
            };
            
            xhr.onerror = () => {
                this.completeUploadProgress(progressId, false);
                this.showError('Upload failed');
            };
            
            xhr.send(formData);
            
        } catch (error) {
            console.error('💀 Error uploading file:', error);
            this.showError('Failed to upload file');
        }
    }

    // Show upload progress
    showUploadProgress(id, fileName, progress) {
        const uploadsContainer = document.getElementById('uploadsContainer') || this.createUploadsContainer();
        
        const progressElement = document.createElement('div');
        progressElement.id = `upload-progress-${id}`;
        progressElement.className = 'upload-progress';
        progressElement.innerHTML = `
            <div class="upload-info">
                <i class="fas fa-file-upload"></i>
                <div class="upload-details">
                    <div class="upload-name">${fileName}</div>
                    <div class="upload-status">Uploading... ${progress}%</div>
                </div>
            </div>
            <div class="upload-progress-bar">
                <div class="upload-progress-fill" style="width: ${progress}%"></div>
            </div>
        `;
        
        uploadsContainer.appendChild(progressElement);
        this.uploadProgress.set(id, { element: progressElement, progress: progress });
    }

    // Update upload progress
    updateUploadProgress(id, progress) {
        const upload = this.uploadProgress.get(id);
        if (upload) {
            upload.progress = progress;
            const fill = upload.element.querySelector('.upload-progress-fill');
            const status = upload.element.querySelector('.upload-status');
            if (fill) fill.style.width = `${progress}%`;
            if (status) status.textContent = `Uploading... ${progress}%`;
        }
    }

    // Complete upload progress
    completeUploadProgress(id, success) {
        const upload = this.uploadProgress.get(id);
        if (upload) {
            if (success) {
                upload.element.classList.add('upload-success');
                upload.element.querySelector('.upload-status').textContent = 'Upload complete!';
                setTimeout(() => upload.element.remove(), 3000);
            } else {
                upload.element.classList.add('upload-error');
                upload.element.querySelector('.upload-status').textContent = 'Upload failed';
                setTimeout(() => upload.element.remove(), 5000);
            }
            this.uploadProgress.delete(id);
        }
    }

    // Create uploads container
    createUploadsContainer() {
        const container = document.createElement('div');
        container.id = 'uploadsContainer';
        container.className = 'uploads-container';
        document.body.appendChild(container);
        return container;
    }

    // Initialize UI
    initUI() {
        console.log('🎨 Initializing UI...');
        
        // Create main chat container if it doesn't exist
        if (!document.getElementById('chatContainer')) {
            this.createChatUI();
        }
        
        // Initialize theme
        this.applyTheme(this.settings.theme);
        
        // Initialize event listeners for UI elements
        this.initUIEventListeners();
        
        console.log('✅ UI initialized');
    }

    // Create chat UI
    createChatUI() {
        const container = document.createElement('div');
        container.id = 'chatContainer';
        container.className = 'chat-container';
        container.innerHTML = this.getChatUITemplate();
        document.body.appendChild(container);
    }

    // Get chat UI template
    getChatUITemplate() {
        return `
            <!-- Sidebar -->
            <div class="sidebar ${this.sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}">
                <div class="sidebar-header">
                    <div class="group-info">
                        <div class="group-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="group-details">
                            <h2 class="group-name">PrimeX Grup</h2>
                            <div class="group-status">
                                <span class="status-dot online"></span>
                                <span class="status-text">${this.onlineUsers.length} online</span>
                            </div>
                        </div>
                    </div>
                    <button class="sidebar-toggle" onclick="primexChat.toggleSidebar()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                </div>
                
                <!-- User Profile -->
                <div class="user-profile">
                    <img src="${this.currentUser?.avatar || '/assets/images/default-avatar.png'}" 
                         alt="${this.currentUser?.displayName || 'User'}" 
                         class="user-avatar"
                         onclick="primexChat.openProfileModal()">
                    <div class="user-details">
                        <div class="user-name">${this.currentUser?.displayName || 'User'}</div>
                        <div class="user-status" id="userStatus">Online</div>
                    </div>
                    <button class="settings-toggle" onclick="primexChat.openSettingsModal()">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
                
                <!-- Online Users -->
                <div class="sidebar-section">
                    <div class="section-header">
                        <h3>Online Users</h3>
                        <span class="badge" id="onlineCount">0</span>
                    </div>
                    <div class="online-users-list" id="onlineUsers">
                        <!-- Online users will be populated here -->
                    </div>
                </div>
                
                <!-- Groups -->
                <div class="sidebar-section">
                    <div class="section-header">
                        <h3>Groups</h3>
                        <button class="btn-icon" onclick="primexChat.createGroup()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="groups-list" id="groupsList">
                        <!-- Groups will be populated here -->
                    </div>
                </div>
                
                <!-- Conversations -->
                <div class="sidebar-section">
                    <div class="section-header">
                        <h3>Conversations</h3>
                    </div>
                    <div class="conversations-list" id="conversationsList">
                        <!-- Conversations will be populated here -->
                    </div>
                </div>
            </div>
            
            <!-- Main Chat Area -->
            <div class="main-chat">
                <!-- Chat Header -->
                <div class="chat-header">
                    <div class="chat-info">
                        <h2 class="chat-title">PrimeX Grup</h2>
                        <div class="chat-subtitle" id="typingIndicators">
                            <!-- Typing indicators will appear here -->
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button class="btn-icon" onclick="primexChat.searchMessages()" title="Search">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.showChatInfo()" title="Chat Info">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.startVideoCall()" title="Video Call">
                            <i class="fas fa-video"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.startVoiceCall()" title="Voice Call">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Messages Container -->
                <div class="messages-container" id="messagesContainer" onscroll="primexChat.handleScroll()">
                    <!-- Messages will be rendered here -->
                </div>
                
                <!-- Chat Input -->
                <div class="chat-input-container">
                    <div class="input-actions">
                        <button class="btn-icon" onclick="primexChat.toggleEmojiPicker()" title="Emoji">
                            <i class="far fa-smile"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.attachFile()" title="Attach File">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.takePhoto()" title="Camera">
                            <i class="fas fa-camera"></i>
                        </button>
                        <button class="btn-icon" onclick="primexChat.recordVoiceMessage()" title="Voice Message">
                            <i class="fas fa-microphone"></i>
                        </button>
                    </div>
                    
                    <div class="message-input-wrapper">
                        <div class="reply-indicator" id="replyIndicator" style="display: none;">
                            <div class="reply-info">
                                <i class="fas fa-reply"></i>
                                <span id="replyToName"></span>
                                <button class="btn-icon" onclick="primexChat.cancelReply()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        
                        <textarea 
                            id="messageInput" 
                            class="message-input" 
                            placeholder="Type a message..." 
                            rows="1"
                            oninput="primexChat.handleInput()"
                            onkeydown="primexChat.handleKeyDown(event)"
                        ></textarea>
                        
                        <button id="sendButton" class="btn-send" onclick="primexChat.sendMessageFromInput()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    <!-- Emoji Picker (hidden by default) -->
                    <div class="emoji-picker" id="emojiPicker" style="display: none;">
                        <!-- Emoji picker will be loaded here -->
                    </div>
                </div>
            </div>
            
            <!-- Modals -->
            <div class="modals-container">
                <!-- Profile Modal -->
                <div class="modal" id="profileModal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Your Profile</h3>
                            <button class="btn-icon" onclick="primexChat.closeProfileModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- Profile form will be here -->
                        </div>
                    </div>
                </div>
                
                <!-- Settings Modal -->
                <div class="modal" id="settingsModal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Settings</h3>
                            <button class="btn-icon" onclick="primexChat.closeSettingsModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- Settings form will be here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Error Flash -->
            <div class="error-flash" id="errorFlash" style="display: none;"></div>
            
            <!-- Notification Container -->
            <div class="notification-container" id="notificationContainer"></div>
            
            <!-- Uploads Container -->
            <div class="uploads-container" id="uploadsContainer"></div>
        `;
    }

    // Initialize UI event listeners
    initUIEventListeners() {
        // Message input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('input', () => this.handleInput());
            messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
            messageInput.addEventListener('focus', () => this.updateLastActivity());
        }
        
        // Send button
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessageFromInput());
        }
        
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('beforeunload', () => this.handleBeforeUnload());
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        window.addEventListener('focus', () => this.handleWindowFocus());
        window.addEventListener('blur', () => this.handleWindowBlur());
        
        // Drag and drop for file upload
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                messagesContainer.classList.add('drag-over');
            });
            
            messagesContainer.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                messagesContainer.classList.remove('drag-over');
            });
            
            messagesContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                messagesContainer.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileDrop(files);
                }
            });
        }
        
        // Click outside to close modals
        document.addEventListener('click', (e) => {
            if (this.modalOpen && !e.target.closest('.modal-content')) {
                this.closeAllModals();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    // Handle message input
    handleInput() {
        const input = document.getElementById('messageInput');
        if (!input) return;
        
        // Auto-resize textarea
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 150) + 'px';
        
        // Send typing indicator
        this.sendTypingIndicator();
        
        // Update last activity
        this.updateLastActivity();
    }

    // Send typing indicator
    sendTypingIndicator() {
        const now = Date.now();
        
        // Throttle typing events
        if (now - this.lastTypingEvent < this.typingThrottle) return;
        
        if (!this.typingEventSent && this.socket?.connected) {
            this.socket.emit('user_typing', {
                userId: this.currentUser.userId,
                groupId: 'PrimeX Grup',
                timestamp: now
            });
            
            this.typingEventSent = true;
            this.lastTypingEvent = now;
            
            // Reset after timeout
            setTimeout(() => {
                this.typingEventSent = false;
            }, this.typingThrottle);
        }
    }

    // Handle key down in message input
    handleKeyDown(event) {
        // Enter to send (unless Shift is pressed)
        if (event.key === 'Enter' && !event.shiftKey && this.settings.enterToSend) {
            event.preventDefault();
            this.sendMessageFromInput();
        }
        
        // Escape to cancel reply/edit
        if (event.key === 'Escape') {
            if (this.replyToMessage) {
                this.cancelReply();
            }
            if (this.editMessageId) {
                this.cancelEdit();
            }
        }
        
        // Ctrl/Cmd + K to search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.searchMessages();
        }
        
        // Ctrl/Cmd + / for help
        if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            this.showHelp();
        }
    }

    // Send message from input
    sendMessageFromInput() {
        const input = document.getElementById('messageInput');
        if (!input) return;
        
        const content = input.value.trim();
        if (!content) return;
        
        // Clear input
        input.value = '';
        input.style.height = 'auto';
        
        // Reset typing indicator
        this.typingEventSent = false;
        
        // Send stop typing event
        if (this.socket?.connected) {
            this.socket.emit('user_stopped_typing', {
                userId: this.currentUser.userId,
                groupId: 'PrimeX Grup',
                timestamp: Date.now()
            });
        }
        
        // Handle reply
        if (this.replyToMessage) {
            this.sendMessage(`Replying to ${this.replyToMessage.displayName}: ${content}`, 'text');
            this.cancelReply();
            return;
        }
        
        // Handle edit
        if (this.editMessageId) {
            this.updateMessage(this.editMessageId, content);
            this.cancelEdit();
            return;
        }
        
        // Send normal message
        this.sendMessage(content, 'text');
    }

    // Update message
    async updateMessage(messageId, newContent) {
        try {
            const response = await fetch(`/api/v1/chat/edit/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: newContent })
            });
            
            if (!response.ok) throw new Error('Failed to update message');
            
            // Update in local array
            const messageIndex = this.messages.findIndex(m => m.id === messageId);
            if (messageIndex !== -1) {
                this.messages[messageIndex].content = newContent;
                this.messages[messageIndex].edited = true;
                
                // Update in UI
                const messageElement = document.getElementById(`message-${messageId}`);
                if (messageElement) {
                    const textElement = messageElement.querySelector('.message-text');
                    if (textElement) {
                        textElement.innerHTML = this.formatMessageContent(newContent);
                    }
                }
            }
            
            this.showNotification('Message updated', 'success');
            
        } catch (error) {
            console.error('💀 Error updating message:', error);
            this.showError('Failed to update message');
        }
    }

    // Cancel reply
    cancelReply() {
        this.replyToMessage = null;
        
        const replyIndicator = document.getElementById('replyIndicator');
        if (replyIndicator) {
            replyIndicator.style.display = 'none';
        }
        
        const input = document.getElementById('messageInput');
        if (input) {
            input.placeholder = 'Type a message...';
        }
    }

    // Cancel edit
    cancelEdit() {
        this.editMessageId = null;
        
        const input = document.getElementById('messageInput');
        if (input) {
            input.value = '';
            input.placeholder = 'Type a message...';
        }
    }

    // Toggle sidebar
    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('sidebar-open');
            sidebar.classList.toggle('sidebar-closed');
        }
    }

    // Open profile modal
    openProfileModal() {
        this.profileOpen = true;
        this.modalOpen = true;
        
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.style.display = 'block';
            
            // Populate profile form
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = this.getProfileFormHTML();
            }
        }
    }

    // Close profile modal
    closeProfileModal() {
        this.profileOpen = false;
        this.modalOpen = false;
        
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Get profile form HTML
    getProfileFormHTML() {
        return `
            <form id="profileForm" class="profile-form" onsubmit="event.preventDefault(); primexChat.updateProfile()">
                <div class="form-group">
                    <label for="profileAvatar">Avatar</label>
                    <div class="avatar-upload">
                        <img src="${this.currentUser?.avatar || '/assets/images/default-avatar.png'}" 
                             id="avatarPreview" 
                             class="avatar-preview"
                             onclick="document.getElementById('avatarInput').click()">
                        <input type="file" id="avatarInput" accept="image/*" style="display: none;"
                               onchange="primexChat.previewAvatar(event)">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('avatarInput').click()">
                            <i class="fas fa-upload"></i> Change Avatar
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="displayName">Display Name</label>
                    <input type="text" id="displayName" 
                           value="${this.currentUser?.displayName || ''}" 
                           ${!this.canChangeUsername() ? 'disabled' : ''}>
                    ${!this.canChangeUsername() ? 
                        '<div class="form-help">You can change your username once per week</div>' : ''}
                </div>
                
                <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea id="bio" rows="3">${this.currentUser?.bio || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="status">Status</label>
                    <select id="status">
                        <option value="online" ${this.currentUser?.status === 'online' ? 'selected' : ''}>Online</option>
                        <option value="away" ${this.currentUser?.status === 'away' ? 'selected' : ''}>Away</option>
                        <option value="busy" ${this.currentUser?.status === 'busy' ? 'selected' : ''}>Busy</option>
                        <option value="invisible" ${this.currentUser?.status === 'invisible' ? 'selected' : ''}>Invisible</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                    <button type="button" class="btn-secondary" onclick="primexChat.closeProfileModal()">
                        Cancel
                    </button>
                </div>
            </form>
        `;
    }

    // Check if username can be changed
    canChangeUsername() {
        if (!this.currentUser?.lastUsernameChange) return true;
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const lastChange = new Date(this.currentUser.lastUsernameChange);
        
        return lastChange <= oneWeekAgo;
    }

    // Preview avatar
    previewAvatar(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('avatarPreview');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }

    // Update profile
    async updateProfile() {
        try {
            const formData = new FormData();
            
            // Get form values
            const displayName = document.getElementById('displayName')?.value;
            const bio = document.getElementById('bio')?.value;
            const status = document.getElementById('status')?.value;
            const avatarInput = document.getElementById('avatarInput');
            
            // Add avatar if selected
            if (avatarInput?.files[0]) {
                formData.append('avatar', avatarInput.files[0]);
            }
            
            formData.append('displayName', displayName);
            formData.append('bio', bio);
            formData.append('status', status);
            
            const response = await fetch('/api/v1/users/update', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error('Failed to update profile');
            
            const updatedUser = await response.json();
            this.currentUser = { ...this.currentUser, ...updatedUser };
            
            // Update localStorage
            localStorage.setItem('primex_user', JSON.stringify(this.currentUser));
            
            // Update UI
            this.updateUserProfile();
            
            // Send profile update to socket
            if (this.socket?.connected) {
                this.socket.emit('user_profile_update', {
                    userId: this.currentUser.userId,
                    profile: this.currentUser,
                    timestamp: Date.now()
                });
            }
            
            this.closeProfileModal();
            this.showNotification('Profile updated successfully!', 'success');
            
        } catch (error) {
            console.error('💀 Error updating profile:', error);
            this.showError('Failed to update profile');
        }
    }

    // Update user profile in UI
    updateUserProfile() {
        // Update avatar
        const avatarElements = document.querySelectorAll('.user-avatar');
        avatarElements.forEach(el => {
            if (el.src !== this.currentUser.avatar) {
                el.src = this.currentUser.avatar;
            }
        });
        
        // Update display name
        const nameElements = document.querySelectorAll('.user-name');
        nameElements.forEach(el => {
            if (el.textContent !== this.currentUser.displayName) {
                el.textContent = this.currentUser.displayName;
            }
        });
        
        // Update status
        this.updateOnlineStatus(this.currentUser.status);
    }

    // Open settings modal
    openSettingsModal() {
        this.settingsOpen = true;
        this.modalOpen = true;
        
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'block';
            
            // Populate settings form
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.innerHTML = this.getSettingsFormHTML();
            }
        }
    }

    // Close settings modal
    closeSettingsModal() {
        this.settingsOpen = false;
        this.modalOpen = false;
        
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Get settings form HTML
    getSettingsFormHTML() {
        return `
            <form id="settingsForm" class="settings-form" onsubmit="event.preventDefault(); primexChat.saveSettings()">
                <div class="settings-section">
                    <h4><i class="fas fa-bell"></i> Notifications</h4>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="notificationsEnabled" ${this.settings.notifications ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Enable Notifications</div>
                            <div class="setting-description">Show desktop notifications for new messages</div>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="soundsEnabled" ${this.settings.sounds ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Enable Sounds</div>
                            <div class="setting-description">Play sound effects for messages and notifications</div>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="vibrationEnabled" ${this.settings.vibration ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Enable Vibration</div>
                            <div class="setting-description">Vibrate device for notifications (mobile only)</div>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4><i class="fas fa-paint-brush"></i> Appearance</h4>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-title">Theme</div>
                        </div>
                        <select id="themeSelect" class="theme-select">
                            <option value="dark" ${this.settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
                            <option value="light" ${this.settings.theme === 'light' ? 'selected' : ''}>Light</option>
                            <option value="matrix" ${this.settings.theme === 'matrix' ? 'selected' : ''}>Matrix</option>
                            <option value="cyber" ${this.settings.theme === 'cyber' ? 'selected' : ''}>Cyber</option>
                            <option value="purple" ${this.settings.theme === 'purple' ? 'selected' : ''}>Purple</option>
                        </select>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-title">Font Size</div>
                        </div>
                        <select id="fontSizeSelect" class="font-size-select">
                            <option value="small" ${this.settings.fontSize === 'small' ? 'selected' : ''}>Small</option>
                            <option value="medium" ${this.settings.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="large" ${this.settings.fontSize === 'large' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4><i class="fas fa-comments"></i> Chat</h4>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="enterToSend" ${this.settings.enterToSend ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Enter to Send</div>
                            <div class="setting-description">Press Enter to send message (Shift+Enter for new line)</div>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="showEmojis" ${this.settings.showEmojis ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Show Emojis</div>
                            <div class="setting-description">Display emoji picker in message input</div>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="showImages" ${this.settings.showImages ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Show Images</div>
                            <div class="setting-description">Display images in chat automatically</div>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label class="switch">
                            <input type="checkbox" id="autoDownload" ${this.settings.autoDownload ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                        <div class="setting-info">
                            <div class="setting-title">Auto Download</div>
                            <div class="setting-description">Automatically download media files</div>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4><i class="fas fa-history"></i> Message History</h4>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-title">Messages to Keep</div>
                            <div class="setting-description">Number of messages to load and keep in memory</div>
                        </div>
                        <select id="messageHistorySelect" class="message-history-select">
                            <option value="50" ${this.settings.messageHistory === 50 ? 'selected' : ''}>50 messages</option>
                            <option value="100" ${this.settings.messageHistory === 100 ? 'selected' : ''}>100 messages</option>
                            <option value="200" ${this.settings.messageHistory === 200 ? 'selected' : ''}>200 messages</option>
                            <option value="500" ${this.settings.messageHistory === 500 ? 'selected' : ''}>500 messages</option>
                            <option value="1000" ${this.settings.messageHistory === 1000 ? 'selected' : ''}>1000 messages</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                    <button type="button" class="btn-secondary" onclick="primexChat.closeSettingsModal()">
                        Cancel
                    </button>
                    <button type="button" class="btn-danger" onclick="primexChat.resetSettings()">
                        <i class="fas fa-undo"></i> Reset to Defaults
                    </button>
                </div>
            </form>
        `;
    }

    // Save settings
    saveSettings() {
        // Get values from form
        this.settings = {
            notifications: document.getElementById('notificationsEnabled')?.checked || false,
            sounds: document.getElementById('soundsEnabled')?.checked || false,
            vibration: document.getElementById('vibrationEnabled')?.checked || false,
            theme: document.getElementById('themeSelect')?.value || 'dark',
            fontSize: document.getElementById('fontSizeSelect')?.value || 'medium',
            enterToSend: document.getElementById('enterToSend')?.checked || true,
            showEmojis: document.getElementById('showEmojis')?.checked || true,
            showImages: document.getElementById('showImages')?.checked || true,
            autoDownload: document.getElementById('autoDownload')?.checked || false,
            messageHistory: parseInt(document.getElementById('messageHistorySelect')?.value || '100')
        };
        
        // Save to localStorage
        localStorage.setItem('primex_settings', JSON.stringify(this.settings));
        
        // Apply settings
        this.applyTheme(this.settings.theme);
        this.applyFontSize(this.settings.fontSize);
        
        this.closeSettingsModal();
        this.showNotification('Settings saved!', 'success');
        
        // Log event
        this.logEvent('settings_updated', this.settings);
    }

    // Reset settings
    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            this.settings = {
                sounds: true,
                notifications: true,
                vibration: true,
                theme: 'dark',
                fontSize: 'medium',
                autoDownload: false,
                enterToSend: true,
                showEmojis: true,
                showImages: true,
                messageHistory: 100
            };
            
            localStorage.removeItem('primex_settings');
            
            this.applyTheme(this.settings.theme);
            this.applyFontSize(this.settings.fontSize);
            
            this.closeSettingsModal();
            this.showNotification('Settings reset to defaults!', 'success');
            
            // Log event
            this.logEvent('settings_reset', this.settings);
        }
    }

    // Load settings from localStorage
    loadSettings() {
        const savedSettings = localStorage.getItem('primex_settings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }

    // Toggle emoji picker
    toggleEmojiPicker() {
        this.emojiPickerOpen = !this.emojiPickerOpen;
        const picker = document.getElementById('emojiPicker');
        if (picker) {
            picker.style.display = this.emojiPickerOpen ? 'block' : 'none';
            
            if (this.emojiPickerOpen && !picker.innerHTML) {
                this.loadEmojiPicker();
            }
        }
    }

    // Load emoji picker
    loadEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        if (!picker) return;
        
        // Simple emoji list (in a real app, you'd use a proper emoji library)
        const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
        
        let html = '<div class="emoji-categories">';
        html += '<button class="emoji-category active" data-category="all">All</button>';
        html += '<button class="emoji-category" data-category="smileys">😀</button>';
        html += '<button class="emoji-category" data-category="animals">🐱</button>';
        html += '<button class="emoji-category" data-category="food">🍎</button>';
        html += '<button class="emoji-category" data-category="activities">⚽</button>';
        html += '</div>';
        
        html += '<div class="emoji-grid">';
        emojis.forEach(emoji => {
            html += `<span class="emoji" onclick="primexChat.insertEmoji('${emoji}')">${emoji}</span>`;
        });
        html += '</div>';
        
        picker.innerHTML = html;
    }

    // Insert emoji into message input
    insertEmoji(emoji) {
        const input = document.getElementById('messageInput');
        if (input) {
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(cursorPos);
            
            input.value = textBefore + emoji + textAfter;
            input.focus();
            input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
            
            // Trigger input event
            input.dispatchEvent(new Event('input'));
        }
        
        // Close emoji picker
        this.toggleEmojiPicker();
    }

    // Attach file
    attachFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx,.txt';
        
        input.onchange = (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                this.handleFileUpload(files);
            }
        };
        
        input.click();
    }

    // Handle file upload
    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            this.uploadFile(file);
        });
    }

    // Handle file drop
    handleFileDrop(files) {
        this.handleFileUpload(files);
    }

    // Take photo
    async takePhoto() {
        try {
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            
            // Create video element to capture photo
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            
            // Create canvas for photo
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            // Wait for video to be ready
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Draw video frame to canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Convert to blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Create file from blob
                        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
                        this.uploadFile(file);
                    }
                    
                    // Stop camera
                    stream.getTracks().forEach(track => track.stop());
                }, 'image/jpeg', 0.8);
            };
            
        } catch (error) {
            console.error('💀 Error accessing camera:', error);
            this.showError('Could not access camera. Please check permissions.');
        }
    }

    // Record voice message
    async recordVoiceMessage() {
        try {
            if (this.isRecording) {
                // Stop recording
                this.stopVoiceRecording();
                return;
            }
            
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            const chunks = [];
            
            this.mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], `voice_${Date.now()}.webm`, { type: 'audio/webm' });
                this.uploadFile(file);
                
                // Stop microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            // Start recording
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Show recording UI
            this.showVoiceRecordingUI();
            
            // Start timer
            this.voiceMessageDuration = 0;
            this.voiceMessageTimer = setInterval(() => {
                this.voiceMessageDuration++;
                this.updateVoiceRecordingUI();
            }, 1000);
            
        } catch (error) {
            console.error('💀 Error recording voice:', error);
            this.showError('Could not access microphone. Please check permissions.');
        }
    }

    // Stop voice recording
    stopVoiceRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            
            // Clear timer
            if (this.voiceMessageTimer) {
                clearInterval(this.voiceMessageTimer);
                this.voiceMessageTimer = null;
            }
            
            // Hide recording UI
            this.hideVoiceRecordingUI();
        }
    }

    // Show voice recording UI
    showVoiceRecordingUI() {
        const recordingUI = document.createElement('div');
        recordingUI.id = 'voiceRecordingUI';
        recordingUI.className = 'voice-recording-ui';
        recordingUI.innerHTML = `
            <div class="recording-indicator">
                <div class="recording-dot"></div>
                <span>Recording...</span>
            </div>
            <div class="recording-timer" id="recordingTimer">0:00</div>
            <button class="btn-danger" onclick="primexChat.stopVoiceRecording()">
                <i class="fas fa-stop"></i> Stop
            </button>
        `;
        
        document.body.appendChild(recordingUI);
    }

    // Update voice recording UI
    updateVoiceRecordingUI() {
        const timer = document.getElementById('recordingTimer');
        if (timer) {
            const minutes = Math.floor(this.voiceMessageDuration / 60);
            const seconds = this.voiceMessageDuration % 60;
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // Hide voice recording UI
    hideVoiceRecordingUI() {
        const ui = document.getElementById('voiceRecordingUI');
        if (ui) {
            ui.remove();
        }
    }

    // Search messages
    searchMessages() {
        const query = prompt('Search messages:');
        if (query) {
            this.isSearching = true;
            this.filteredMessages = this.messages.filter(message => 
                message.content.toLowerCase().includes(query.toLowerCase()) ||
                message.displayName.toLowerCase().includes(query.toLowerCase())
            );
            
            this.renderSearchResults();
        }
    }

    // Render search results
    renderSearchResults() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        // Clear container
        messagesContainer.innerHTML = '';
        
        // Render filtered messages
        this.filteredMessages.forEach(message => {
            this.renderMessage(message);
        });
        
        // Add search header
        const header = document.createElement('div');
        header.className = 'search-header';
        header.innerHTML = `
            <div class="search-info">
                <i class="fas fa-search"></i>
                <span>${this.filteredMessages.length} results found</span>
            </div>
            <button class="btn-secondary" onclick="primexChat.clearSearch()">
                <i class="fas fa-times"></i> Clear Search
            </button>
        `;
        
        messagesContainer.prepend(header);
        
        this.showNotification(`Found ${this.filteredMessages.length} messages`, 'info');
    }

    // Clear search
    clearSearch() {
        this.isSearching = false;
        this.filteredMessages = [];
        this.renderMessages();
    }

    // Start video call
    async startVideoCall() {
        try {
            // Request camera and microphone
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            
            this.localStream = stream;
            
            // Create peer connection
            this.peerConnection = new RTCPeerConnection();
            
            // Add local stream to connection
            stream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, stream);
            });
            
            // Create data channel for chat
            this.dataChannel = this.peerConnection.createDataChannel('chat');
            this.setupDataChannel();
            
            // Set up ICE candidates
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate && this.socket?.connected) {
                    this.socket.emit('call_ice_candidate', {
                        candidate: event.candidate,
                        target: 'group', // In group call, broadcast to all
                        timestamp: Date.now()
                    });
                }
            };
            
            // Set up remote stream
            this.peerConnection.ontrack = (event) => {
                if (!this.remoteStream) {
                    this.remoteStream = new MediaStream();
                }
                event.streams[0].getTracks().forEach(track => {
                    this.remoteStream.addTrack(track);
                });
                
                // Display remote video
                this.showVideoCallUI();
            };
            
            // Create offer
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            
            // Send offer via socket
            if (this.socket?.connected) {
                this.socket.emit('call_initiate', {
                    offer: offer,
                    type: 'video',
                    target: 'group', // Group call
                    timestamp: Date.now()
                });
            }
            
            // Show calling UI
            this.showCallingUI('video');
            
            // Start call timer
            this.videoCallDuration = 0;
            this.videoCallTimer = setInterval(() => {
                this.videoCallDuration++;
                this.updateCallTimer();
            }, 1000);
            
            // Set call timeout (30 seconds)
            this.callTimeout = setTimeout(() => {
                if (!this.isCallActive) {
                    this.endCall();
                    this.showNotification('Call timed out', 'error');
                }
            }, 30000);
            
        } catch (error) {
            console.error('💀 Error starting video call:', error);
            this.showError('Failed to start video call. Please check permissions.');
        }
    }

    // Start voice call
    async startVoiceCall() {
        try {
            // Request microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.localStream = stream;
            
            // Create peer connection (similar to video call but without video)
            this.peerConnection = new RTCPeerConnection();
            
            // Add audio track
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                this.peerConnection.addTrack(audioTrack, stream);
            }
            
            // Create data channel
            this.dataChannel = this.peerConnection.createDataChannel('chat');
            this.setupDataChannel();
            
            // Set up ICE candidates
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate && this.socket?.connected) {
                    this.socket.emit('call_ice_candidate', {
                        candidate: event.candidate,
                        target: 'group',
                        timestamp: Date.now()
                    });
                }
            };
            
            // Set up remote audio
            this.peerConnection.ontrack = (event) => {
                if (!this.remoteStream) {
                    this.remoteStream = new MediaStream();
                }
                event.streams[0].getTracks().forEach(track => {
                    this.remoteStream.addTrack(track);
                });
                
                // Play remote audio
                this.showVoiceCallUI();
            };
            
            // Create offer
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            
            // Send offer
            if (this.socket?.connected) {
                this.socket.emit('call_initiate', {
                    offer: offer,
                    type: 'audio',
                    target: 'group',
                    timestamp: Date.now()
                });
            }
            
            // Show calling UI
            this.showCallingUI('audio');
            
            // Start timer
            this.videoCallDuration = 0;
            this.videoCallTimer = setInterval(() => {
                this.videoCallDuration++;
                this.updateCallTimer();
            }, 1000);
            
            // Set timeout
            this.callTimeout = setTimeout(() => {
                if (!this.isCallActive) {
                    this.endCall();
                    this.showNotification('Call timed out', 'error');
                }
            }, 30000);
            
        } catch (error) {
            console.error('💀 Error starting voice call:', error);
            this.showError('Failed to start voice call. Please check permissions.');
        }
    }

    // Setup data channel
    setupDataChannel() {
        if (!this.dataChannel) return;
        
        this.dataChannel.onopen = () => {
            console.log('Data channel opened');
            this.isCallActive = true;
        };
        
        this.dataChannel.onclose = () => {
            console.log('Data channel closed');
            this.isCallActive = false;
        };
        
        this.dataChannel.onmessage = (event) => {
            console.log('Data channel message:', event.data);
            // Handle chat messages during call
        };
        
        this.dataChannel.onerror = (error) => {
            console.error('Data channel error:', error);
        };
    }

    // Show calling UI
    showCallingUI(type) {
        const callingUI = document.createElement('div');
        callingUI.id = 'callingUI';
        callingUI.className = 'calling-ui';
        callingUI.innerHTML = `
            <div class="calling-content">
                <div class="calling-icon">
                    <i class="fas fa-${type === 'video' ? 'video' : 'phone'}"></i>
                </div>
                <div class="calling-info">
                    <div class="calling-status" id="callStatus">Calling...</div>
                    <div class="calling-timer" id="callTimer">00:00</div>
                </div>
                <div class="calling-actions">
                    <button class="btn-danger" onclick="primexChat.endCall()">
                        <i class="fas fa-phone-slash"></i> End Call
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(callingUI);
        
        // Play ringtone
        this.playSound('ringtone');
        this.ringtoneTimeout = setTimeout(() => {
            this.sounds.ringtone.pause();
            this.sounds.ringtone.currentTime = 0;
        }, 10000); // Stop after 10 seconds
    }

    // Show video call UI
    showVideoCallUI() {
        const callingUI = document.getElementById('callingUI');
        if (callingUI) {
            // Update status
            const status = callingUI.querySelector('#callStatus');
            if (status) status.textContent = 'Connected';
            
            // Add video elements
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            videoContainer.innerHTML = `
                <div class="local-video">
                    <video id="localVideo" autoplay muted playsinline></video>
                </div>
                <div class="remote-video">
                    <video id="remoteVideo" autoplay playsinline></video>
                </div>
            `;
            
            callingUI.querySelector('.calling-content').appendChild(videoContainer);
            
            // Set video streams
            const localVideo = document.getElementById('localVideo');
            const remoteVideo = document.getElementById('remoteVideo');
            
            if (localVideo && this.localStream) {
                localVideo.srcObject = this.localStream;
            }
            
            if (remoteVideo && this.remoteStream) {
                remoteVideo.srcObject = this.remoteStream;
            }
            
            // Stop ringtone
            if (this.ringtoneTimeout) {
                clearTimeout(this.ringtoneTimeout);
                this.sounds.ringtone.pause();
                this.sounds.ringtone.currentTime = 0;
            }
        }
    }

    // Show voice call UI
    showVoiceCallUI() {
        const callingUI = document.getElementById('callingUI');
        if (callingUI) {
            const status = callingUI.querySelector('#callStatus');
            if (status) status.textContent = 'Connected';
            
            // Create audio element for remote audio
            const audio = document.createElement('audio');
            audio.id = 'remoteAudio';
            audio.autoplay = true;
            
            if (this.remoteStream) {
                audio.srcObject = this.remoteStream;
            }
            
            callingUI.appendChild(audio);
            
            // Stop ringtone
            if (this.ringtoneTimeout) {
                clearTimeout(this.ringtoneTimeout);
                this.sounds.ringtone.pause();
                this.sounds.ringtone.currentTime = 0;
            }
        }
    }

    // Update call timer
    updateCallTimer() {
        const timer = document.getElementById('callTimer');
        if (timer) {
            const minutes = Math.floor(this.videoCallDuration / 60);
            const seconds = this.videoCallDuration % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // End call
    endCall() {
        // Close peer connection
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        
        // Stop local stream
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        
        // Stop remote stream
        if (this.remoteStream) {
            this.remoteStream.getTracks().forEach(track => track.stop());
            this.remoteStream = null;
        }
        
        // Clear timers
        if (this.videoCallTimer) {
            clearInterval(this.videoCallTimer);
            this.videoCallTimer = null;
        }
        
        if (this.callTimeout) {
            clearTimeout(this.callTimeout);
            this.callTimeout = null;
        }
        
        if (this.ringtoneTimeout) {
            clearTimeout(this.ringtoneTimeout);
            this.ringtoneTimeout = null;
        }
        
        // Stop ringtone
        this.sounds.ringtone.pause();
        this.sounds.ringtone.currentTime = 0;
        
        // Remove calling UI
        const callingUI = document.getElementById('callingUI');
        if (callingUI) {
            callingUI.remove();
        }
        
        // Send call end event
        if (this.socket?.connected) {
            this.socket.emit('call_end', {
                userId: this.currentUser.userId,
                type: 'group',
                timestamp: Date.now()
            });
        }
        
        this.isCallActive = false;
        this.showNotification('Call ended', 'info');
    }

    // Handle incoming call
    async onCallInitiate(data) {
        if (this.isCallActive) {
            // Already in a call, reject
            if (this.socket?.connected) {
                this.socket.emit('call_reject', {
                    callId: data.callId,
                    reason: 'busy',
                    timestamp: Date.now()
                });
            }
            return;
        }
        
        // Show call incoming UI
        this.showIncomingCallUI(data);
    }

    // Show incoming call UI
    showIncomingCallUI(data) {
        const incomingCallUI = document.createElement('div');
        incomingCallUI.id = 'incomingCallUI';
        incomingCallUI.className = 'incoming-call-ui';
        incomingCallUI.innerHTML = `
            <div class="incoming-call-content">
                <div class="caller-info">
                    <img src="${data.callerAvatar || '/assets/images/default-avatar.png'}" 
                         alt="${data.callerName}" 
                         class="caller-avatar">
                    <div class="caller-details">
                        <div class="caller-name">${data.callerName}</div>
                        <div class="call-type">Incoming ${data.type} call</div>
                    </div>
                </div>
                <div class="call-actions">
                    <button class="btn-success" onclick="primexChat.acceptCall(${JSON.stringify(data).replace(/"/g, '&quot;')})">
                        <i class="fas fa-phone"></i> Accept
                    </button>
                    <button class="btn-danger" onclick="primexChat.rejectCall('${data.callId}')">
                        <i class="fas fa-phone-slash"></i> Reject
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(incomingCallUI);
        
        // Play ringtone
        this.playSound('ringtone');
        
        // Auto reject after 30 seconds
        setTimeout(() => {
            if (document.getElementById('incomingCallUI')) {
                this.rejectCall(data.callId);
            }
        }, 30000);
    }

    // Accept call
    async acceptCall(data) {
        try {
            // Remove incoming call UI
            const incomingCallUI = document.getElementById('incomingCallUI');
            if (incomingCallUI) {
                incomingCallUI.remove();
            }
            
            // Stop ringtone
            this.sounds.ringtone.pause();
            this.sounds.ringtone.currentTime = 0;
            
            // Set up peer connection for answering
            this.peerConnection = new RTCPeerConnection();
            
            // Add tracks based on call type
            if (data.type === 'video') {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                this.localStream = stream;
                stream.getTracks().forEach(track => {
                    this.peerConnection.addTrack(track, stream);
                });
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.localStream = stream;
                const audioTrack = stream.getAudioTracks()[0];
                if (audioTrack) {
                    this.peerConnection.addTrack(audioTrack, stream);
                }
            }
            
            // Set up data channel
            this.peerConnection.ondatachannel = (event) => {
                this.dataChannel = event.channel;
                this.setupDataChannel();
            };
            
            // Set up ICE candidates
            this.peerConnection.onicecandidate = (event) => {
                if (event.candidate && this.socket?.connected) {
                    this.socket.emit('call_ice_candidate', {
                        candidate: event.candidate,
                        target: data.callerId,
                        timestamp: Date.now()
                    });
                }
            };
            
            // Set up remote stream
            this.peerConnection.ontrack = (event) => {
                if (!this.remoteStream) {
                    this.remoteStream = new MediaStream();
                }
                event.streams[0].getTracks().forEach(track => {
                    this.remoteStream.addTrack(track);
                });
                
                // Show call UI based on type
                if (data.type === 'video') {
                    this.showVideoCallUI();
                } else {
                    this.showVoiceCallUI();
                }
            };
            
            // Set remote description from offer
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
            
            // Create answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            
            // Send answer
            if (this.socket?.connected) {
                this.socket.emit('call_accept', {
                    callId: data.callId,
                    answer: answer,
                    timestamp: Date.now()
                });
            }
            
            // Show calling UI
            this.showCallingUI(data.type);
            
            // Start timer
            this.videoCallDuration = 0;
            this.videoCallTimer = setInterval(() => {
                this.videoCallDuration++;
                this.updateCallTimer();
            }, 1000);
            
            this.isCallActive = true;
            
        } catch (error) {
            console.error('💀 Error accepting call:', error);
            this.showError('Failed to accept call');
            this.rejectCall(data.callId);
        }
    }

    // Reject call
    rejectCall(callId) {
        // Remove incoming call UI
        const incomingCallUI = document.getElementById('incomingCallUI');
        if (incomingCallUI) {
            incomingCallUI.remove();
        }
        
        // Stop ringtone
        this.sounds.ringtone.pause();
        this.sounds.ringtone.currentTime = 0;
        
        // Send reject event
        if (this.socket?.connected) {
            this.socket.emit('call_reject', {
                callId: callId,
                reason: 'rejected',
                timestamp: Date.now()
            });
        }
        
        this.showNotification('Call rejected', 'info');
    }

    // Show chat info
    showChatInfo() {
        const info = `
            <strong>PrimeX Grup Info:</strong><br>
            • Created: 2026-02-08<br>
            • Creator: Epan<br>
            • Version: 9.66.0<br>
            • Online Users: ${this.onlineUsers.length}<br>
            • Total Messages: ${this.messageCount}<br>
            • Your Status: ${this.currentUser?.status || 'unknown'}<br>
            • Connection: ${this.isConnected ? 'Connected' : 'Disconnected'}<br>
            • Ping: ${this.connectionLatency || 'N/A'}ms
        `;
        
        alert(info);
    }

    // Create group
    createGroup() {
        const groupName = prompt('Enter group name:');
        if (groupName) {
            // Send group creation request
            if (this.socket?.connected) {
                this.socket.emit('group_create', {
                    name: groupName,
                    creatorId: this.currentUser.userId,
                    timestamp: Date.now()
                });
                
                this.showNotification(`Creating group "${groupName}"...`, 'info');
            }
        }
    }

    // Handle window resize
    handleResize() {
        // Update responsive classes
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
            document.body.classList.remove('desktop-view');
        } else {
            document.body.classList.add('desktop-view');
            document.body.classList.remove('mobile-view');
        }
        
        // Adjust UI elements
        this.adjustUIForScreenSize();
    }

    // Adjust UI for screen size
    adjustUIForScreenSize() {
        // Auto-close sidebar on mobile
        if (window.innerWidth < 768 && this.sidebarOpen) {
            this.toggleSidebar();
        }
    }

    // Handle before unload
    handleBeforeUnload() {
        // Update status to offline
        this.updateOnlineStatus('offline');
        
        // Send disconnect event
        if (this.socket?.connected) {
            this.socket.emit('user_offline', {
                userId: this.currentUser.userId,
                timestamp: Date.now()
            });
        }
        
        // Save session data
        const sessionData = {
            start: this.sessionStart,
            expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            messages: this.messageCount,
            duration: Date.now() - this.sessionStart
        };
        localStorage.setItem('primex_session', JSON.stringify(sessionData));
        
        // Save analytics
        localStorage.setItem('primex_analytics', JSON.stringify(this.analyticsEvents.slice(-50)));
    }

    // Handle online status
    handleOnline() {
        this.isOnline = true;
        console.log('🌐 Device is online');
        
        // Try to reconnect socket
        if (!this.socket?.connected) {
            this.socket?.connect();
        }
        
        this.showNotification('You are back online!', 'success');
    }

    // Handle offline status
    handleOffline() {
        this.isOnline = false;
        console.log('📴 Device is offline');
        this.showNotification('You are offline. Some features may not work.', 'warning');
    }

    // Handle window focus
    handleWindowFocus() {
        this.isIdle = false;
        this.isAway = false;
        this.updateOnlineStatus('online');
        this.updateLastActivity();
        
        // Mark messages as read
        this.markMessagesAsRead();
    }

    // Handle window blur
    handleWindowBlur() {
        // Start idle timer
        this.updateLastActivity();
    }

    // Mark messages as read
    markMessagesAsRead() {
        // Get unread messages
        const unreadMessages = this.messages.filter(msg => 
            msg.userId !== this.currentUser.userId && 
            msg.status !== 'read'
        );
        
        if (unreadMessages.length > 0) {
            // Update status locally
            unreadMessages.forEach(msg => {
                msg.status = 'read';
                
                // Update in UI
                const messageElement = document.getElementById(`message-${msg.id}`);
                if (messageElement) {
                    const statusElement = messageElement.querySelector('.message-status');
                    if (statusElement) {
                        statusElement.innerHTML = this.getMessageStatusIcon('read');
                    }
                }
            });
            
            // Send read receipt to server
            if (this.socket?.connected) {
                this.socket.emit('message_read', {
                    messageIds: unreadMessages.map(msg => msg.id),
                    userId: this.currentUser.userId,
                    timestamp: Date.now()
                });
            }
        }
    }

    // Handle scroll
    handleScroll() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        // Check if user is near bottom
        const isNearBottom = 
            messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100;
        
        // Auto-scroll if near bottom
        this.autoScrollEnabled = isNearBottom;
        
        // Load more messages if at top
        if (messagesContainer.scrollTop === 0 && this.messages.length > 0) {
            this.loadMoreMessages();
        }
    }

    // Load more messages
    async loadMoreMessages() {
        try {
            const oldestMessage = this.messages[0];
            if (!oldestMessage) return;
            
            const response = await fetch(`/api/v1/chat/messages?before=${oldestMessage.timestamp}&limit=50`);
            if (!response.ok) return;
            
            const moreMessages = await response.json();
            if (moreMessages.length > 0) {
                // Add to beginning of messages array
                this.messages.unshift(...moreMessages);
                
                // Render new messages at top
                this.renderMoreMessages(moreMessages);
                
                console.log(`📨 Loaded ${moreMessages.length} more messages`);
            }
            
        } catch (error) {
            console.error('💀 Error loading more messages:', error);
        }
    }

    // Render more messages at top
    renderMoreMessages(messages) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        // Save current scroll position
        const oldScrollHeight = messagesContainer.scrollHeight;
        
        // Create fragment for new messages
        const fragment = document.createDocumentFragment();
        messages.reverse().forEach(message => { // Reverse because we're adding at top
            const messageElement = this.createMessageElement(message);
            fragment.prepend(messageElement);
        });
        
        // Insert at top
        messagesContainer.prepend(fragment);
        
        // Restore scroll position
        const newScrollHeight = messagesContainer.scrollHeight;
        messagesContainer.scrollTop = newScrollHeight - oldScrollHeight;
    }

    // Create message element (for rendering)
    createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.userId === this.currentUser.userId ? 'message-outgoing' : 'message-incoming'}`;
        messageElement.id = `message-${message.id}`;
        messageElement.dataset.messageId = message.id;
        
        // Similar to renderMessage but returns element instead of appending
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        if (message.userId !== this.currentUser.userId) {
            const avatar = document.createElement('img');
            avatar.className = 'message-avatar';
            avatar.src = message.avatar || '/assets/images/default-avatar.png';
            avatar.alt = message.displayName;
            messageElement.appendChild(avatar);
        }
        
        const contentContainer = document.createElement('div');
        contentContainer.className = 'message-content';
        
        if (message.userId !== this.currentUser.userId) {
            const nameElement = document.createElement('div');
            nameElement.className = 'message-sender';
            nameElement.textContent = message.displayName;
            contentContainer.appendChild(nameElement);
        }
        
        const textElement = document.createElement('div');
        textElement.className = 'message-text';
        textElement.innerHTML = this.formatMessageContent(message.content);
        contentContainer.appendChild(textElement);
        
        const timeElement = document.createElement('div');
        timeElement.className = 'message-time';
        timeElement.textContent = this.formatTime(message.timestamp);
        contentContainer.appendChild(timeElement);
        
        if (message.userId === this.currentUser.userId) {
            const statusElement = document.createElement('div');
            statusElement.className = 'message-status';
            statusElement.innerHTML = this.getMessageStatusIcon(message.status);
            contentContainer.appendChild(statusElement);
        }
        
        bubble.appendChild(contentContainer);
        messageElement.appendChild(bubble);
        
        return messageElement;
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(event) {
        // Don't trigger if user is typing in input
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ctrl/Cmd + N: New conversation
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            this.startNewConversation();
        }
        
        // Ctrl/Cmd + G: Create group
        if ((event.ctrlKey || event.metaKey) && event.key === 'g') {
            event.preventDefault();
            this.createGroup();
        }
        
        // Ctrl/Cmd + ,: Settings
        if ((event.ctrlKey || event.metaKey) && event.key === ',') {
            event.preventDefault();
            this.openSettingsModal();
        }
        
        // Ctrl/Cmd + L: Clear chat
        if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
            event.preventDefault();
            this.clearChat();
        }
        
        // Escape: Close modals
        if (event.key === 'Escape') {
            if (this.modalOpen) {
                this.closeAllModals();
            }
            if (this.emojiPickerOpen) {
                this.toggleEmojiPicker();
            }
            if (this.mediaViewerOpen) {
                this.closeMediaViewer();
            }
        }
    }

    // Start new conversation
    startNewConversation() {
        const userId = prompt('Enter user ID to start conversation:');
        if (userId) {
            // Check if user exists
            const user = this.onlineUsers.find(u => u.userId === userId) ||
                        this.conversations.find(c => c.userId === userId);
            
            if (user) {
                this.selectedChat = { type: 'private', userId: userId };
                this.showNotification(`Starting conversation with ${user.displayName}`, 'info');
            } else {
                this.showError('User not found');
            }
        }
    }

    // Clear chat
    clearChat() {
        if (confirm('Are you sure you want to clear all messages in this chat?')) {
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
                this.messages = [];
                
                // Send clear request to server
                if (this.socket?.connected) {
                    this.socket.emit('chat_clear', {
                        groupId: 'PrimeX Grup',
                        userId: this.currentUser.userId,
                        timestamp: Date.now()
                    });
                }
                
                this.showNotification('Chat cleared', 'success');
            }
        }
    }

    // Close all modals
    closeAllModals() {
        this.closeProfileModal();
        this.closeSettingsModal();
        this.modalOpen = false;
    }

    // Show help
    showHelp() {
        const helpText = `
            PRIMEX GRUP CHAT - Keyboard Shortcuts:
            
            General:
            Ctrl/Cmd + K      - Search messages
            Ctrl/Cmd + /      - Show this help
            Ctrl/Cmd + N      - New conversation
            Ctrl/Cmd + G      - Create group
            Ctrl/Cmd + ,      - Settings
            Ctrl/Cmd + L      - Clear chat
            Escape           - Close modals
            
            Messaging:
            Enter            - Send message (if enabled)
            Shift + Enter    - New line
            Ctrl/Cmd + A     - Select all text
            
            Navigation:
            Ctrl/Cmd + 1     - Focus message input
            Ctrl/Cmd + 2     - Toggle sidebar
            
            Calls:
            Ctrl/Cmd + V     - Start video call
            Ctrl/Cmd + P     - Start voice call
            Ctrl/Cmd + E     - End call
            
            Version: 9.66.0
            Created: 2026-02-08
            Creator: Epan
        `;
        
        alert(helpText);
    }

    // Update connection status in UI
    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `connection-status status-${status}`;
        }
    }

    // Initialize media devices
    async initMediaDevices() {
        try {
            // Check for media devices support
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                console.log('Media devices not supported');
                return;
            }
            
            // List available devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log('🎤 Available media devices:', devices);
            
            // Store device info
            this.mediaDevices = devices;
            
        } catch (error) {
            console.error('💀 Error initializing media devices:', error);
        }
    }

    // Initialize service worker
    async initServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.worker.register('/service-worker.js');
                console.log('Service Worker registered:', registration);
                
                this.serviceWorker = registration;
                
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    // Initialize notifications
    async initNotifications() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return;
        }
        
        // Request permission
        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            this.notificationPermission = permission;
            console.log('Notification permission:', permission);
        }
        
        // Setup notification click handler
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data.type === 'NOTIFICATION_CLICK') {
                    // Handle notification click
                    window.focus();
                    this.showNotification('Notification clicked!', 'info');
                }
            });
        }
    }

    // Initialize analytics
    initAnalytics() {
        console.log('📊 Analytics initialized');
        
        // Track page view
        this.pageViews++;
        this.logEvent('page_view', {
            url: window.location.href,
            referrer: document.referrer,
            pageViews: this.pageViews
        });
        
        // Track user behavior
        this.trackUserBehavior();
    }

    // Track user behavior
    trackUserBehavior() {
        // Track clicks
        document.addEventListener('click', (event) => {
            const element = event.target;
            const tagName = element.tagName.toLowerCase();
            const className = element.className;
            const id = element.id;
            const text = element.textContent?.substring(0, 100);
            
            this.userBehavior.push({
                type: 'click',
                tagName,
                className,
                id,
                text,
                timestamp: Date.now(),
                x: event.clientX,
                y: event.clientY
            });
            
            // Limit behavior log size
            if (this.userBehavior.length > 1000) {
                this.userBehavior = this.userBehavior.slice(-500);
            }
        });
        
        // Track scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.userBehavior.push({
                    type: 'scroll',
                    scrollY: window.scrollY,
                    scrollX: window.scrollX,
                    timestamp: Date.now()
                });
            }, 200);
        });
    }

    // Initialize performance monitoring
    initPerformanceMonitoring() {
        if ('performance' in window) {
            this.performance = window.performance;
            
            // Monitor memory (if available)
            if ('memory' in performance) {
                setInterval(() => {
                    this.performanceMetrics.memoryUsage.push(performance.memory.usedJSHeapSize);
                    if (this.performanceMetrics.memoryUsage.length > 100) {
                        this.performanceMetrics.memoryUsage.shift();
                    }
                }, 10000); // Every 10 seconds
            }
            
            // Monitor FPS
            this.monitorFPS();
            
            console.log('📈 Performance monitoring initialized');
        }
    }

    // Monitor FPS
    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;
        
        const measureFPS = () => {
            const currentTime = performance.now();
            frames++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                this.performanceMetrics.fps = fps;
                
                // Reset
                lastTime = currentTime;
                frames = 0;
                
                // Log low FPS
                if (fps < 30) {
                    console.warn(`Low FPS: ${fps}`);
                    this.logEvent('low_fps', { fps, timestamp: Date.now() });
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
    }

    // Initialize error handling
    initErrorHandling() {
        // Global error handler
        window.onerror = (message, source, lineno, colno, error) => {
            this.handleError(error || new Error(message), 'global');
            return false;
        };
        
        // Unhandled promise rejection
        window.onunhandledrejection = (event) => {
            this.handleError(event.reason, 'unhandled_rejection');
        };
        
        console.log('🛡️ Error handling initialized');
    }

    // Initialize idle detection
    initIdleDetection() {
        // Reset idle timer on user activity
        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        activityEvents.forEach(event => {
            document.addEventListener(event, () => {
                this.updateLastActivity();
            });
        });
        
        console.log('⏰ Idle detection initialized');
    }

    // ==================== SOCKET EVENT HANDLERS ====================

    onSocketDisconnect(reason) {
        console.log('❌ Socket disconnected:', reason);
        this.isConnected = false;
        this.isAuthenticated = false;
        
        this.updateConnectionStatus('disconnected');
        this.showNotification('Disconnected from server. Reconnecting...', 'warning');
        
        // Log event
        this.logEvent('socket_disconnect', { reason, timestamp: Date.now() });
    }

    onSocketConnectError(error) {
        console.error('💀 Socket connection error:', error);
        this.updateConnectionStatus('error');
        this.showError('Connection error: ' + error.message);
    }

    onSocketReconnect(attempt) {
        console.log('🔁 Reconnected on attempt:', attempt);
        this.isConnected = true;
        this.updateConnectionStatus('connected');
        this.showNotification('Reconnected to server!', 'success');
        
        // Re-authenticate
        this.authenticate();
    }

    onSocketReconnectAttempt(attempt) {
        console.log('🔄 Reconnection attempt:', attempt);
        this.reconnectionAttempts = attempt;
        this.updateConnectionStatus('reconnecting');
    }

    onSocketReconnecting(attempt) {
        console.log('⏳ Reconnecting... attempt:', attempt);
    }

    onSocketReconnectError(error) {
        console.error('💀 Reconnection error:', error);
    }

    onSocketReconnectFailed() {
        console.error('💀 Reconnection failed');
        this.updateConnectionStatus('failed');
        this.showError('Failed to reconnect. Please refresh the page.');
    }

    onSocketPing() {
        // Handle ping from server
    }

    onSocketPong(latency) {
        this.connectionLatency = latency;
        this.performanceMetrics.connectionLatency.push(latency);
        
        // Keep only last 100 measurements
        if (this.performanceMetrics.connectionLatency.length > 100) {
            this.performanceMetrics.connectionLatency.shift();
        }
    }

    onSocketError(error) {
        console.error('💀 Socket error:', error);
        this.handleError(error, 'socket');
    }

    onUnauthorized(data) {
        console.error('🔒 Unauthorized:', data);
        this.isAuthenticated = false;
        
        // Clear local data
        localStorage.removeItem('primex_user');
        localStorage.removeItem('primex_token');
        localStorage.removeItem('primex_session');
        
        // Redirect to login
        window.location.href = '/login.html?reason=unauthorized';
    }

    onUserOnline(data) {
        console.log('👤 User online:', data.user.displayName);
        
        // Add to online users if not already there
        const existingIndex = this.onlineUsers.findIndex(u => u.userId === data.user.userId);
        if (existingIndex === -1) {
            this.onlineUsers.push(data.user);
        } else {
            this.onlineUsers[existingIndex] = data.user;
        }
        
        // Update UI
        this.renderOnlineUsers();
        this.updateOnlineCount();
        
        // Show notification for important users
        if (data.user.role === 'admin' || data.user.role === 'moderator') {
            this.showNotification(`${data.user.displayName} is now online`, 'info');
        }
    }

    onUserOffline(data) {
        console.log('👤 User offline:', data.user.displayName);
        
        // Remove from online users
        this.onlineUsers = this.onlineUsers.filter(u => u.userId !== data.user.userId);
        
        // Update UI
        this.renderOnlineUsers();
        this.updateOnlineCount();
    }

    onUserTyping(data) {
        console.log('✍️ User typing:', data.userName);
        this.showTypingIndicator(data.userId, data.userName);
    }

    onUserStoppedTyping(data) {
        console.log('⏹️ User stopped typing:', data.userName);
        this.hideTypingIndicator(data.userId);
    }

    onUserStatusChange(data) {
        console.log('🔄 User status change:', data.userId, data.status);
        
        // Update in online users
        const user = this.onlineUsers.find(u => u.userId === data.userId);
        if (user) {
            user.status = data.status;
            this.renderOnlineUsers();
        }
    }

    onUserProfileUpdate(data) {
        console.log('📝 User profile update:', data.userId);
        
        // Update in online users
        const userIndex = this.onlineUsers.findIndex(u => u.userId === data.userId);
        if (userIndex !== -1) {
            this.onlineUsers[userIndex] = { ...this.onlineUsers[userIndex], ...data.profile };
            this.renderOnlineUsers();
        }
        
        // Update in current user if it's us
        if (data.userId === this.currentUser.userId) {
            this.currentUser = { ...this.currentUser, ...data.profile };
            this.updateUserProfile();
        }
    }

    onMessageReceive(data) {
        console.log('📨 Message received:', data.messageId);
        
        // Add to messages
        this.messages.push(data);
        
        // Render message
        this.renderMessage(data);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Play message sound (if not from current user)
        if (data.userId !== this.currentUser.userId) {
            this.playSound('message');
            
            // Show notification if window is not focused
            if (document.hidden && this.settings.notifications) {
                this.showDesktopNotification(data.displayName, data.content);
            }
        }
        
        // Update message count
        this.messageCount++;
    }

    onMessageDelivered(data) {
        console.log('✓ Message delivered:', data.messageId);
        
        // Update message status in UI
        const message = this.messages.find(m => m.id === data.messageId);
        if (message) {
            message.status = 'delivered';
            
            const messageElement = document.getElementById(`message-${data.messageId}`);
            if (messageElement) {
                const statusElement = messageElement.querySelector('.message-status');
                if (statusElement) {
                    statusElement.innerHTML = this.getMessageStatusIcon('delivered');
                }
            }
        }
    }

    onMessageRead(data) {
        console.log('👁️ Message read:', data.messageIds);
        
        // Update message status in UI
        data.messageIds.forEach(messageId => {
            const message = this.messages.find(m => m.id === messageId);
            if (message && message.userId === this.currentUser.userId) {
                message.status = 'read';
                
                const messageElement = document.getElementById(`message-${messageId}`);
                if (messageElement) {
                    const statusElement = messageElement.querySelector('.message-status');
                    if (statusElement) {
                        statusElement.innerHTML = this.getMessageStatusIcon('read');
                    }
                }
            }
        });
    }

    onMessageDelete(data) {
        console.log('🗑️ Message deleted:', data.messageId);
        
        // Remove from messages
        this.messages = this.messages.filter(m => m.id !== data.messageId);
        
        // Remove from UI
        const messageElement = document.getElementById(`message-${data.messageId}`);
        if (messageElement) {
            messageElement.remove();
        }
    }

    onMessageEdit(data) {
        console.log('✏️ Message edited:', data.messageId);
        
        // Update message in array
        const messageIndex = this.messages.findIndex(m => m.id === data.messageId);
        if (messageIndex !== -1) {
            this.messages[messageIndex] = { ...this.messages[messageIndex], ...data };
            
            // Update in UI
            const messageElement = document.getElementById(`message-${data.messageId}`);
            if (messageElement) {
                const textElement = messageElement.querySelector('.message-text');
                if (textElement) {
                    textElement.innerHTML = this.formatMessageContent(data.content);
                }
            }
        }
    }

    onMessageReaction(data) {
        console.log('👍 Message reaction:', data.messageId, data.reaction);
        
        // Update message in array
        const message = this.messages.find(m => m.id === data.messageId);
        if (message) {
            if (!message.reactions) {
                message.reactions = [];
            }
            
            const existingIndex = message.reactions.findIndex(r => r.userId === data.userId);
            if (existingIndex !== -1) {
                message.reactions[existingIndex] = data;
            } else {
                message.reactions.push(data);
            }
            
            // Update in UI (you would need to add reaction display to your message UI)
            this.updateMessageReactions(data.messageId, message.reactions);
        }
    }

    // Update message reactions in UI
    updateMessageReactions(messageId, reactions) {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (!messageElement) return;
        
        // Find or create reactions container
        let reactionsContainer = messageElement.querySelector('.message-reactions');
        if (!reactionsContainer) {
            reactionsContainer = document.createElement('div');
            reactionsContainer.className = 'message-reactions';
            messageElement.querySelector('.message-content').appendChild(reactionsContainer);
        }
        
        // Update reactions
        const reactionsHTML = reactions.map(r => 
            `<span class="reaction" title="${r.userName}: ${r.reaction}">${r.reaction}</span>`
        ).join('');
        
        reactionsContainer.innerHTML = reactionsHTML;
    }

    onGroupJoin(data) {
        console.log('👥 User joined group:', data.user.displayName, data.groupId);
        
        // Show notification
        if (data.groupId === 'PrimeX Grup') {
            this.showNotification(`${data.user.displayName} joined the group`, 'info');
        }
    }

    onGroupLeave(data) {
        console.log('👥 User left group:', data.user.displayName, data.groupId);
        
        // Show notification
        if (data.groupId === 'PrimeX Grup') {
            this.showNotification(`${data.user.displayName} left the group`, 'info');
        }
    }

    onGroupUpdate(data) {
        console.log('🔄 Group updated:', data.groupId);
        // Update group info in UI
    }

    onGroupMemberAdd(data) {
        console.log('➕ Group member added:', data.userId, data.groupId);
    }

    onGroupMemberRemove(data) {
        console.log('➖ Group member removed:', data.userId, data.groupId);
    }

    onGroupMessage(data) {
        console.log('📨 Group message:', data.groupId, data.messageId);
        // Similar to onMessageReceive but for groups
        this.onMessageReceive(data);
    }

    onCallInitiate(data) {
        console.log('📞 Incoming call:', data.callerName, data.type);
        this.onCallInitiate(data);
    }

    onCallAccept(data) {
        console.log('✅ Call accepted:', data.callId);
        // Handle call acceptance
    }

    onCallReject(data) {
        console.log('❌ Call rejected:', data.callId, data.reason);
        // Handle call rejection
    }

    onCallEnd(data) {
        console.log('📞 Call ended:', data.callId);
        this.endCall();
    }

    onCallOffer(data) {
        console.log('📞 Call offer received');
        // Handle WebRTC offer
    }

    onCallAnswer(data) {
        console.log('📞 Call answer received');
        // Handle WebRTC answer
    }

    onCallIceCandidate(data) {
        console.log('📞 ICE candidate received');
        // Handle ICE candidate
    }

    onNotificationNew(data) {
        console.log('🔔 New notification:', data.title);
        this.showNotification(data.title, data.type || 'info');
    }

    onNotificationRead(data) {
        console.log('🔔 Notification read:', data.notificationId);
    }

    onNotificationDelete(data) {
        console.log('🔔 Notification deleted:', data.notificationId);
    }

    onPing() {
        // Respond to ping
        if (this.socket?.connected) {
            this.socket.emit('pong', Date.now());
        }
    }

    onPong(latency) {
        this.connectionLatency = latency;
    }

    onError(data) {
        console.error('💀 Server error:', data);
        this.showError(data.message || 'Server error');
        this.handleError(new Error(data.message), 'server');
    }

    onWarning(data) {
        console.warn('⚠️ Server warning:', data);
        this.showNotification(data.message, 'warning');
    }

    onInfo(data) {
        console.log('ℹ️ Server info:', data);
        this.showNotification(data.message, 'info');
    }

    onMaintenance(data) {
        console.log('🔧 Maintenance:', data);
        this.showNotification(data.message, 'warning');
        
        // If maintenance is starting, prepare for disconnect
        if (data.type === 'starting') {
            this.showNotification('Server maintenance starting soon. You may be disconnected.', 'warning');
        }
    }

    // Show desktop notification
    showDesktopNotification(title, body) {
        if (!this.settings.notifications || this.notificationPermission !== 'granted') {
            return;
        }
        
        const options = {
            body: body.substring(0, 100),
            icon: '/assets/images/primex-logo.png',
            badge: '/assets/images/primex-logo.png',
            tag: 'primex-chat',
            renotify: true,
            silent: !this.settings.sounds,
            requireInteraction: false
        };
        
        if ('vibrate' in navigator && this.settings.vibration) {
            options.vibrate = [200, 100, 200];
        }
        
        const notification = new Notification(title, options);
        
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
        
        // Auto close after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);
        
        return notification;
    }

    // Update online count in UI
    updateOnlineCount() {
        const countElement = document.getElementById('onlineCount');
        if (countElement) {
            countElement.textContent = this.onlineUsers.length.toString();
        }
    }

    // Get connection latency
    getConnectionLatency() {
        if (this.performanceMetrics.connectionLatency.length === 0) {
            return null;
        }
        
        const sum = this.performanceMetrics.connectionLatency.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.performanceMetrics.connectionLatency.length);
    }

    // Log performance metrics
    logPerformanceMetrics() {
        const metrics = {
            timestamp: Date.now(),
            user: this.currentUser?.userId,
            messages: this.messageCount,
            onlineUsers: this.onlineUsers.length,
            connectionLatency: this.getConnectionLatency(),
            memoryUsage: this.performanceMetrics.memoryUsage.slice(-1)[0],
            fps: this.performanceMetrics.fps,
            errorCount: this.errorCount,
            sessionDuration: Date.now() - this.sessionStart
        };
        
        console.log('📊 Performance metrics:', metrics);
        this.logEvent('performance_metrics', metrics);
        
        return metrics;
    }

    // Get system info
    getSystemInfo() {
        return {
            app: {
                name: 'PrimeX Grup',
                version: '9.66.0',
                creator: 'Epan',
                created: '2026-02-08'
            },
            user: this.currentUser,
            device: this.getDeviceInfo(),
            connection: this.getConnectionInfo(),
            performance: this.logPerformanceMetrics(),
            session: {
                start: this.sessionStart,
                duration: Date.now() - this.sessionStart,
                messages: this.messageCount,
                media: this.mediaCount,
                calls: this.callCount
            },
            settings: this.settings
        };
    }

    // Export chat data
    exportChatData() {
        const data = {
            messages: this.messages,
            users: this.onlineUsers,
            groups: this.groups,
            conversations: this.conversations,
            systemInfo: this.getSystemInfo(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `primex-chat-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Chat data exported!', 'success');
    }

    // Import chat data
    importChatData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validate data
                if (!data.messages || !Array.isArray(data.messages)) {
                    throw new Error('Invalid chat data format');
                }
                
                // Import messages
                this.messages = data.messages;
                this.renderMessages();
                
                this.showNotification(`Imported ${data.messages.length} messages`, 'success');
                
            } catch (error) {
                console.error('💀 Error importing chat data:', error);
                this.showError('Failed to import chat data: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }

    // Backup chat data
    backupChatData() {
        const backup = {
            messages: this.messages.slice(-1000), // Last 1000 messages
            user: this.currentUser,
            settings: this.settings,
            timestamp: Date.now()
        };
        
        localStorage.setItem('primex_backup', JSON.stringify(backup));
        this.showNotification('Chat data backed up locally!', 'success');
        
        return backup;
    }

    // Restore from backup
    restoreFromBackup() {
        const backup = localStorage.getItem('primex_backup');
        if (!backup) {
            this.showError('No backup found');
            return;
        }
        
        if (confirm('Are you sure you want to restore from backup? Current messages will be replaced.')) {
            try {
                const data = JSON.parse(backup);
                this.messages = data.messages || [];
                this.renderMessages();
                this.showNotification('Restored from backup!', 'success');
            } catch (error) {
                console.error('💀 Error restoring from backup:', error);
                this.showError('Failed to restore from backup');
            }
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear ALL chat data? This cannot be undone!')) {
            // Clear local storage
            localStorage.removeItem('primex_user');
            localStorage.removeItem('primex_token');
            localStorage.removeItem('primex_session');
            localStorage.removeItem('primex_settings');
            localStorage.removeItem('primex_backup');
            localStorage.removeItem('primex_analytics');
            localStorage.removeItem('primex_saved_messages');
            
            // Clear current data
            this.messages = [];
            this.onlineUsers = [];
            this.conversations = [];
            this.groups = [];
            
            // Clear UI
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
            }
            
            this.renderOnlineUsers();
            this.renderConversations();
            this.renderGroups();
            
            this.showNotification('All data cleared!', 'success');
            
            // Log event
            this.logEvent('data_cleared', { timestamp: Date.now() });
        }
    }

    // Debug mode toggle
    toggleDebugMode() {
        this.isDebugMode = !this.isDebugMode;
        
        if (this.isDebugMode) {
            console.log('🐛 Debug mode enabled');
            this.showNotification('Debug mode enabled', 'info');
            
            // Show debug panel
            this.showDebugPanel();
        } else {
            console.log('🐛 Debug mode disabled');
            this.showNotification('Debug mode disabled', 'info');
            
            // Hide debug panel
            this.hideDebugPanel();
        }
        
        return this.isDebugMode;
    }

    // Show debug panel
    showDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.className = 'debug-panel';
        debugPanel.innerHTML = `
            <div class="debug-header">
                <h3>Debug Panel</h3>
                <button class="btn-icon" onclick="primexChat.hideDebugPanel()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="debug-content">
                <div class="debug-section">
                    <h4>Connection</h4>
                    <div>Socket: ${this.isConnected ? 'Connected' : 'Disconnected'}</div>
                    <div>Authenticated: ${this.isAuthenticated ? 'Yes' : 'No'}</div>
                    <div>Latency: ${this.getConnectionLatency() || 'N/A'}ms</div>
                </div>
                <div class="debug-section">
                    <h4>Stats</h4>
                    <div>Messages: ${this.messages.length}</div>
                    <div>Online Users: ${this.onlineUsers.length}</div>
                    <div>Errors: ${this.errorCount}</div>
                </div>
                <div class="debug-actions">
                    <button class="btn-secondary" onclick="primexChat.logSystemInfo()">
                        Log Info
                    </button>
                    <button class="btn-secondary" onclick="primexChat.testConnection()">
                        Test Connection
                    </button>
                    <button class="btn-danger" onclick="primexChat.clearAllData()">
                        Clear All
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(debugPanel);
    }

    // Hide debug panel
    hideDebugPanel() {
        const panel = document.getElementById('debugPanel');
        if (panel) {
            panel.remove();
        }
    }

    // Log system info to console
    logSystemInfo() {
        const info = this.getSystemInfo();
        console.log('🖥️ System Info:', info);
        alert('System info logged to console. Press F12 to view.');
    }

    // Test connection
    testConnection() {
        const startTime = Date.now();
        
        if (this.socket?.connected) {
            this.socket.emit('ping', startTime);
            
            const latency = Date.now() - startTime;
            this.showNotification(`Ping: ${latency}ms`, 'info');
        } else {
            this.showError('Socket not connected');
        }
    }

    // Emergency disconnect
    emergencyDisconnect() {
        if (this.socket?.connected) {
            this.socket.disconnect();
            this.showNotification('Emergency disconnect', 'warning');
        }
    }

    // Emergency reconnect
    emergencyReconnect() {
        if (this.socket && !this.socket.connected) {
            this.socket.connect();
            this.showNotification('Emergency reconnect', 'info');
        }
    }

    // Force refresh
    forceRefresh() {
        if (confirm('Force refresh the chat? Unsaved data may be lost.')) {
            location.reload();
        }
    }

    // Get help
    getHelp() {
        window.open('https://github.com/epan666/primex-grup-chat/wiki', '_blank');
    }

    // Report bug
    reportBug() {
        const bugReport = {
            user: this.currentUser?.userId,
            version: '9.66.0',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            errors: this.errorLog.slice(-10),
            description: prompt('Please describe the bug:')
        };
        
        if (bugReport.description) {
            // Send bug report (in a real app, this would go to your server)
            console.log('🐛 Bug Report:', bugReport);
            
            // Save locally
            const bugReports = JSON.parse(localStorage.getItem('primex_bug_reports') || '[]');
            bugReports.push(bugReport);
            localStorage.setItem('primex_bug_reports', JSON.stringify(bugReports.slice(-50)));
            
            this.showNotification('Bug report submitted! Thank you.', 'success');
        }
    }

    // ==================== PUBLIC API ====================
    
    // Make important methods available globally
    static getInstance() {
        if (!window.primexChatInstance) {
            window.primexChatInstance = new PrimeXChat();
        }
        return window.primexChatInstance;
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.primexChat = PrimeXChat.getInstance();
});

// Make methods available globally
window.PrimeXChat = PrimeXChat;

// Global helper functions
window.copyMessage = (messageId) => window.primexChat?.copyMessage(messageId);
window.replyToMessage = (messageId) => window.primexChat?.replyToMessage(messageId);
window.editMessage = (messageId) => window.primexChat?.editMessage(messageId);
window.deleteMessage = (messageId) => window.primexChat?.deleteMessage(messageId);
window.reportMessage = (messageId) => window.primexChat?.reportMessage(messageId);
window.saveMessage = (messageId) => window.primexChat?.saveMessage(messageId);
window.insertEmoji = (emoji) => window.primexChat?.insertEmoji(emoji);
window.toggleEmojiPicker = () => window.primexChat?.toggleEmojiPicker();
window.attachFile = () => window.primexChat?.attachFile();
window.takePhoto = () => window.primexChat?.takePhoto();
window.recordVoiceMessage = () => window.primexChat?.recordVoiceMessage();
window.stopVoiceRecording = () => window.primexChat?.stopVoiceRecording();
window.toggleSidebar = () => window.primexChat?.toggleSidebar();
window.openProfileModal = () => window.primexChat?.openProfileModal();
window.closeProfileModal = () => window.primexChat?.closeProfileModal();
window.openSettingsModal = () => window.primexChat?.openSettingsModal();
window.closeSettingsModal = () => window.primexChat?.closeSettingsModal();
window.previewAvatar = (event) => window.primexChat?.previewAvatar(event);
window.updateProfile = () => window.primexChat?.updateProfile();
window.saveSettings = () => window.primexChat?.saveSettings();
window.resetSettings = () => window.primexChat?.resetSettings();
window.searchMessages = () => window.primexChat?.searchMessages();
window.clearSearch = () => window.primexChat?.clearSearch();
window.startVideoCall = () => window.primexChat?.startVideoCall();
window.startVoiceCall = () => window.primexChat?.startVoiceCall();
window.endCall = () => window.primexChat?.endCall();
window.acceptCall = (data) => window.primexChat?.acceptCall(data);
window.rejectCall = (callId) => window.primexChat?.rejectCall(callId);
window.showChatInfo = () => window.primexChat?.showChatInfo();
window.createGroup = () => window.primexChat?.createGroup();
window.showHelp = () => window.primexChat?.showHelp();
window.closeMediaViewer = () => window.primexChat?.closeMediaViewer();
window.cancelReply = () => window.primexChat?.cancelReply();
window.cancelEdit = () => window.primexChat?.cancelEdit();
window.sendMessageFromInput = () => window.primexChat?.sendMessageFromInput();
window.handleInput = () => window.primexChat?.handleInput();
window.handleKeyDown = (event) => window.primexChat?.handleKeyDown(event);
window.handleScroll = () => window.primexChat?.handleScroll();

console.log('🔥 PRIMEX GRUP CHAT v9.66.0 - Script loaded');
console.log('📅 Created: 2026-02-08');
console.log('👨‍💻 Creator: Epan');
console.log('🚀 Ready to unleash the power of PrimeX!');