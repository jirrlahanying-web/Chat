// PrimeX Grup Ultimate Constants v9.66
module.exports = {
    // ==================== APP INFO ====================
    APP: {
        NAME: 'PrimeX Grup',
        VERSION: '9.66.0',
        CODE_NAME: 'Dark Phoenix',
        RELEASE_DATE: '2026-02-08',
        CREATOR: 'Epan',
        CREATOR_CONTACT: 'epan@primex.com',
        SUPPORT_EMAIL: 'support@primex.com',
        WEBSITE: 'https://primex-chat.com',
        GITHUB: 'https://github.com/epan666/primex-grup-chat',
        LICENSE: 'PRIMEX-LICENSE-1.0'
    },
    
    // ==================== SERVER ====================
    SERVER: {
        PORT: process.env.PORT || 3000,
        HOST: process.env.HOST || 'localhost',
        PROTOCOL: process.env.PROTOCOL || 'http',
        DOMAIN: process.env.DOMAIN || 'localhost:3000',
        NODE_ENV: process.env.NODE_ENV || 'development',
        CLUSTER_MODE: process.env.CLUSTER_MODE || false,
        WORKERS: process.env.WORKERS || 1,
        SESSION_SECRET: process.env.SESSION_SECRET || 'primex_secret_key_666_ultimate',
        SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
        UPLOAD_MAX_SIZE: 100 * 1024 * 1024, // 100MB
        RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
        RATE_LIMIT_MAX: 1000, // requests per window
        CACHE_TTL: 300, // 5 minutes
        BACKUP_INTERVAL: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // ==================== DATABASE ====================
    DATABASE: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/primex_chat_ultimate',
        REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',
        CONNECTION_POOL_SIZE: 10,
        CONNECTION_TIMEOUT: 30000,
        AUTO_RECONNECT: true,
        BUFFER_COMMANDS: false,
        USE_NEW_URL_PARSER: true,
        USE_UNIFIED_TOPOLOGY: true
    },
    
    // ==================== SECURITY ====================
    SECURITY: {
        JWT_SECRET: process.env.JWT_SECRET || 'jwt_primex_secret_966',
        JWT_EXPIRES_IN: '7d',
        BCRYPT_SALT_ROUNDS: 12,
        PASSWORD_MIN_LENGTH: 6,
        PASSWORD_MAX_LENGTH: 100,
        PASSWORD_REQUIREMENTS: {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        TWO_FACTOR_ISSUER: 'PrimeX Grup',
        SESSION_KEY_LENGTH: 64,
        CSRF_TOKEN_LENGTH: 32,
        API_KEY_LENGTH: 40,
        ENCRYPTION_ALGORITHM: 'aes-256-gcm',
        ENCRYPTION_KEY_LENGTH: 32,
        TOKEN_BLACKLIST_TTL: 24 * 60 * 60 // 24 hours
    },
    
    // ==================== CHAT ====================
    CHAT: {
        GROUP_NAME: 'PrimeX Grup',
        GROUP_ID: 'PRIMEX-966',
        GROUP_DESCRIPTION: 'The ultimate chat experience without limits',
        MAX_MESSAGES_PER_REQUEST: 100,
        MAX_MESSAGE_LENGTH: 5000,
        MAX_TYPING_INDICATORS: 10,
        TYPING_TIMEOUT: 2000, // ms
        MESSAGE_DELAY: 100, // ms
        READ_RECEIPT_DELAY: 1000, // ms
        ONLINE_STATUS_TIMEOUT: 5 * 60 * 1000, // 5 minutes
        AWAY_STATUS_TIMEOUT: 15 * 60 * 1000, // 15 minutes
        MESSAGE_HISTORY_DAYS: 365,
        AUTO_DELETE_OLD_MESSAGES: true,
        MAX_PARTICIPANTS_PER_GROUP: 1000,
        MAX_GROUPS_PER_USER: 50,
        MAX_CONTACTS_PER_USER: 5000,
        MESSAGE_RATE_LIMIT: 10, // messages per second
        FILE_SHARING_ENABLED: true,
        VOICE_MESSAGES_ENABLED: true,
        VIDEO_CALLS_ENABLED: true,
        SCREEN_SHARING_ENABLED: true
    },
    
    // ==================== MEDIA ====================
    MEDIA: {
        ALLOWED_IMAGE_TYPES: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'image/bmp',
            'image/tiff'
        ],
        ALLOWED_VIDEO_TYPES: [
            'video/mp4',
            'video/webm',
            'video/ogg',
            'video/quicktime',
            'video/x-msvideo'
        ],
        ALLOWED_AUDIO_TYPES: [
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/webm',
            'audio/aac',
            'audio/flac'
        ],
        ALLOWED_DOCUMENT_TYPES: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'text/csv',
            'text/html',
            'application/json',
            'application/xml'
        ],
        MAX_IMAGE_SIZE: 20 * 1024 * 1024, // 20MB
        MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
        MAX_AUDIO_SIZE: 10 * 1024 * 1024, // 10MB
        MAX_DOCUMENT_SIZE: 50 * 1024 * 1024, // 50MB
        IMAGE_QUALITY: 85,
        THUMBNAIL_WIDTH: 150,
        THUMBNAIL_HEIGHT: 150,
        AVATAR_WIDTH: 200,
        AVATAR_HEIGHT: 200,
        COMPRESSION_ENABLED: true,
        WATERMARK_ENABLED: false,
        WATERMARK_TEXT: 'PrimeX Grup',
        STORAGE_PROVIDER: 'local', // local, s3, cloudinary
        CDN_ENABLED: false
    },
    
    // ==================== NOTIFICATIONS ====================
    NOTIFICATIONS: {
        ENABLED: true,
        PUSH_NOTIFICATIONS: true,
        EMAIL_NOTIFICATIONS: false,
        SMS_NOTIFICATIONS: false,
        DESKTOP_NOTIFICATIONS: true,
        SOUND_NOTIFICATIONS: true,
        VIBRATION_NOTIFICATIONS: true,
        NOTIFICATION_TIMEOUT: 5000, // ms
        MAX_NOTIFICATIONS: 50,
        AUTO_CLEAR_NOTIFICATIONS: true,
        CLEAR_INTERVAL: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // ==================== UI/UX ====================
    UI: {
        THEMES: ['dark', 'light', 'matrix', 'cyber', 'purple', 'blue', 'green', 'red', 'orange', 'pink'],
        DEFAULT_THEME: 'dark',
        ANIMATION_SPEED: 300, // ms
        TRANSITION_DURATION: 200, // ms
        LOADING_DELAY: 500, // ms
        ERROR_DISPLAY_TIME: 5000, // ms
        SUCCESS_DISPLAY_TIME: 3000, // ms
        TOOLTIP_DELAY: 500, // ms
        MODAL_ANIMATION: 'fade',
        SIDEBAR_WIDTH: 300,
        SIDEBAR_COLLAPSED_WIDTH: 70,
        CHAT_INPUT_HEIGHT: 60,
        MESSAGE_BUBBLE_MAX_WIDTH: '70%',
        EMOJI_PICKER_COLUMNS: 8,
        EMOJI_PICKER_ROWS: 6,
        DATE_FORMAT: 'DD/MM/YYYY',
        TIME_FORMAT: 'HH:mm',
        DATETIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
        TIMEZONE: 'Asia/Jakarta',
        LANGUAGE: 'en',
        RTL_SUPPORT: false,
        ACCESSIBILITY_MODE: false,
        HIGH_CONTRAST_MODE: false,
        REDUCED_MOTION: false
    },
    
    // ==================== SOUNDS ====================
    SOUNDS: {
        MESSAGE: '/assets/sounds/message.mp3',
        NOTIFICATION: '/assets/sounds/notification.mp3',
        ERROR: '/assets/sounds/error.mp3',
        SUCCESS: '/assets/sounds/success.mp3',
        SEND: '/assets/sounds/send.mp3',
        TYPING: '/assets/sounds/typing.mp3',
        LOGIN: '/assets/sounds/login.mp3',
        LOGOUT: '/assets/sounds/logout.mp3',
        CALL: '/assets/sounds/call.mp3',
        RINGTONE: '/assets/sounds/ringtone.mp3',
        ALERT: '/assets/sounds/alert.mp3',
        CLICK: '/assets/sounds/click.mp3',
        HOVER: '/assets/sounds/hover.mp3',
        OPEN: '/assets/sounds/open.mp3',
        CLOSE: '/assets/sounds/close.mp3',
        UPLOAD: '/assets/sounds/upload.mp3',
        DOWNLOAD: '/assets/sounds/download.mp3',
        SEARCH: '/assets/sounds/search.mp3'
    },
    
    // ==================== EMOJIS ====================
    EMOJIS: {
        DEFAULT_SET: 'apple',
        CUSTOM_EMOJIS: true,
        EMOJI_CATEGORIES: ['smileys', 'people', 'animals', 'food', 'activities', 'travel', 'objects', 'symbols', 'flags'],
        REACTION_EMOJIS: ['👍', '👎', '❤️', '🔥', '🥰', '👏', '😮', '😢', '😡', '🎉', '🤔', '👀'],
        MAX_EMOJI_PER_MESSAGE: 20,
        EMOJI_SIZE: '24px',
        ANIMATED_EMOJIS: true
    },
    
    // ==================== ANALYTICS ====================
    ANALYTICS: {
        ENABLED: true,
        PROVIDER: 'internal', // internal, google, mixpanel, amplitude
        TRACK_PAGE_VIEWS: true,
        TRACK_EVENTS: true,
        TRACK_ERRORS: true,
        TRACK_PERFORMANCE: true,
        TRACK_USER_BEHAVIOR: true,
        ANONYMIZE_IP: true,
        DATA_RETENTION_DAYS: 90,
        REAL_TIME_ANALYTICS: true,
        DASHBOARD_ENABLED: true
    },
    
    // ==================== BACKUP ====================
    BACKUP: {
        ENABLED: true,
        SCHEDULE: '0 2 * * *', // Daily at 2 AM
        RETENTION_DAYS: 30,
        COMPRESSION: true,
        ENCRYPTION: true,
        STORAGE_LOCATIONS: ['local', 'cloud'],
        CLOUD_PROVIDER: 'aws', // aws, google, azure
        AUTO_RESTORE: false,
        VERIFY_BACKUPS: true,
        BACKUP_CHAT_HISTORY: true,
        BACKUP_USER_DATA: true,
        BACKUP_MEDIA: true,
        BACKUP_LOGS: true,
        BACKUP_DATABASE: true
    },
    
    // ==================== MONITORING ====================
    MONITORING: {
        ENABLED: true,
        UPTIME_MONITOR: true,
        PERFORMANCE_MONITOR: true,
        ERROR_MONITOR: true,
        SECURITY_MONITOR: true,
        LOG_AGGREGATION: true,
        ALERTING: true,
        ALERT_CHANNELS: ['email', 'slack', 'webhook'],
        METRICS_INTERVAL: 60, // seconds
        HEALTH_CHECK_ENDPOINT: '/health',
        STATUS_ENDPOINT: '/status',
        METRICS_ENDPOINT: '/metrics'
    },
    
    // ==================== INTEGRATIONS ====================
    INTEGRATIONS: {
        GOOGLE_OAUTH: false,
        FACEBOOK_OAUTH: false,
        GITHUB_OAUTH: false,
        TWITTER_OAUTH: false,
        DISCORD_WEBHOOK: false,
        SLACK_WEBHOOK: false,
        TELEGRAM_BOT: false,
        WHATSAPP_API: false,
        EMAIL_SERVICE: false,
        SMS_SERVICE: false,
        PAYMENT_GATEWAY: false,
        CAPTCHA_SERVICE: false,
        MAP_SERVICE: false,
        WEATHER_SERVICE: false,
        TRANSLATION_SERVICE: false,
        VOICE_SERVICE: false,
        VIDEO_SERVICE: false
    },
    
    // ==================== FEATURE FLAGS ====================
    FEATURES: {
        VOICE_MESSAGES: true,
        VIDEO_CALLS: true,
        SCREEN_SHARING: true,
        GROUP_VIDEO_CALLS: true,
        VOICE_CHANNELS: true,
        STORIES: false,
        MARKETPLACE: false,
        GAMES: false,
        BOTS: true,
        PLUGINS: true,
        THEMES: true,
        CUSTOM_EMOJIS: true,
        REACTIONS: true,
        POLLS: true,
        QUIZZES: false,
        EVENTS: false,
        CALENDAR: false,
        TASKS: false,
        NOTES: false,
        FILE_SHARING: true,
        CODE_EDITOR: false,
        DRAWING_BOARD: false,
        MUSIC_PLAYER: false,
        VIDEO_PLAYER: true,
        SCREEN_RECORDING: false,
        TRANSLATION: false,
        VOICE_COMMANDS: false,
        AR_FILTERS: false,
        VR_CHAT: false
    },
    
    // ==================== LIMITS ====================
    LIMITS: {
        MAX_USERS: 100000,
        MAX_GROUPS: 10000,
        MAX_MESSAGES_PER_DAY: 1000,
        MAX_MEDIA_PER_DAY: 100,
        MAX_FRIENDS: 5000,
        MAX_BLOCKED: 1000,
        MAX_REPORTS_PER_DAY: 10,
        MAX_LOGIN_ATTEMPTS: 5,
        MAX_PASSWORD_RESETS: 3,
        MAX_EMAILS_PER_DAY: 50,
        MAX_API_CALLS_PER_MINUTE: 60,
        MAX_SOCKET_CONNECTIONS: 10000,
        MAX_UPLOADS_PER_DAY: 50,
        MAX_DOWNLOADS_PER_DAY: 100,
        MAX_SEARCHES_PER_MINUTE: 30
    },
    
    // ==================== ERROR CODES ====================
    ERROR_CODES: {
        // Authentication
        AUTH_INVALID_CREDENTIALS: 'AUTH_001',
        AUTH_USER_NOT_FOUND: 'AUTH_002',
        AUTH_ACCOUNT_LOCKED: 'AUTH_003',
        AUTH_TOKEN_EXPIRED: 'AUTH_004',
        AUTH_TOKEN_INVALID: 'AUTH_005',
        AUTH_SESSION_EXPIRED: 'AUTH_006',
        
        // Validation
        VALIDATION_ERROR: 'VAL_001',
        VALIDATION_USERNAME_EXISTS: 'VAL_002',
        VALIDATION_EMAIL_EXISTS: 'VAL_003',
        VALIDATION_PHONE_EXISTS: 'VAL_004',
        VALIDATION_PASSWORD_WEAK: 'VAL_005',
        VALIDATION_INVALID_EMAIL: 'VAL_006',
        VALIDATION_INVALID_PHONE: 'VAL_007',
        
        // Chat
        CHAT_MESSAGE_TOO_LONG: 'CHAT_001',
        CHAT_RATE_LIMIT_EXCEEDED: 'CHAT_002',
        CHAT_USER_BLOCKED: 'CHAT_003',
        CHAT_GROUP_FULL: 'CHAT_004',
        CHAT_NO_PERMISSION: 'CHAT_005',
        CHAT_MESSAGE_NOT_FOUND: 'CHAT_006',
        
        // Media
        MEDIA_FILE_TOO_LARGE: 'MEDIA_001',
        MEDIA_INVALID_TYPE: 'MEDIA_002',
        MEDIA_UPLOAD_FAILED: 'MEDIA_003',
        MEDIA_NOT_FOUND: 'MEDIA_004',
        MEDIA_QUOTA_EXCEEDED: 'MEDIA_005',
        
        // User
        USER_NOT_FOUND: 'USER_001',
        USER_BANNED: 'USER_002',
        USER_SUSPENDED: 'USER_003',
        USER_PROFILE_PRIVATE: 'USER_004',
        USERNAME_CHANGE_COOLDOWN: 'USER_005',
        
        // System
        SYSTEM_ERROR: 'SYS_001',
        DATABASE_ERROR: 'SYS_002',
        NETWORK_ERROR: 'SYS_003',
        SERVICE_UNAVAILABLE: 'SYS_004',
        MAINTENANCE_MODE: 'SYS_005',
        RATE_LIMIT_EXCEEDED: 'SYS_006'
    },
    
    // ==================== DEFAULT VALUES ====================
    DEFAULTS: {
        USER_AVATAR: '/assets/images/default-avatar.png',
        GROUP_AVATAR: '/assets/images/default-group.png',
        BANNER_IMAGE: '/assets/images/default-banner.jpg',
        WELCOME_MESSAGE: 'Welcome to PrimeX Grup!',
        AUTO_RESPONSE: 'I am currently unavailable. I will get back to you soon.',
        STATUS_MESSAGE: 'Available',
        TIMEZONE: 'Asia/Jakarta',
        LANGUAGE: 'en',
        CURRENCY: 'USD',
        DATE_FORMAT: 'DD/MM/YYYY',
        TIME_FORMAT: 'HH:mm'
    },
    
    // ==================== REGEX PATTERNS ====================
    REGEX: {
        USERNAME: /^[a-zA-Z0-9_.-]{3,30}$/,
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        BASE64: /^[A-Za-z0-9+/]+={0,2}$/,
        UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    },
    
    // ==================== API ENDPOINTS ====================
    API_ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/v1/auth/login',
            REGISTER: '/api/v1/auth/register',
            LOGOUT: '/api/v1/auth/logout',
            REFRESH_TOKEN: '/api/v1/auth/refresh',
            FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
            RESET_PASSWORD: '/api/v1/auth/reset-password',
            VERIFY_EMAIL: '/api/v1/auth/verify-email',
            TWO_FACTOR: '/api/v1/auth/two-factor'
        },
        USERS: {
            PROFILE: '/api/v1/users/profile',
            UPDATE_PROFILE: '/api/v1/users/update',
            CHANGE_PASSWORD: '/api/v1/users/change-password',
            UPLOAD_AVATAR: '/api/v1/users/upload-avatar',
            SEARCH: '/api/v1/users/search',
            GET_BY_ID: '/api/v1/users/:id',
            GET_ONLINE: '/api/v1/users/online',
            GET_STATS: '/api/v1/users/stats'
        },
        CHAT: {
            SEND_MESSAGE: '/api/v1/chat/send',
            GET_MESSAGES: '/api/v1/chat/messages',
            DELETE_MESSAGE: '/api/v1/chat/delete/:id',
            EDIT_MESSAGE: '/api/v1/chat/edit/:id',
            REACT_TO_MESSAGE: '/api/v1/chat/react/:id',
            GET_CONVERSATIONS: '/api/v1/chat/conversations',
            MARK_AS_READ: '/api/v1/chat/read/:id',
            CLEAR_HISTORY: '/api/v1/chat/clear'
        },
        GROUPS: {
            CREATE: '/api/v1/groups/create',
            JOIN: '/api/v1/groups/join/:id',
            LEAVE: '/api/v1/groups/leave/:id',
            MEMBERS: '/api/v1/groups/:id/members',
            UPDATE: '/api/v1/groups/update/:id',
            DELETE: '/api/v1/groups/delete/:id',
            LIST: '/api/v1/groups',
            SEARCH: '/api/v1/groups/search'
        },
        MEDIA: {
            UPLOAD: '/api/v1/media/upload',
            DELETE: '/api/v1/media/delete/:id',
            GET: '/api/v1/media/:id',
            LIST: '/api/v1/media',
            DOWNLOAD: '/api/v1/media/download/:id',
            COMPRESS: '/api/v1/media/compress'
        },
        NOTIFICATIONS: {
            GET: '/api/v1/notifications',
            MARK_AS_READ: '/api/v1/notifications/read/:id',
            DELETE: '/api/v1/notifications/delete/:id',
            CLEAR_ALL: '/api/v1/notifications/clear',
            SETTINGS: '/api/v1/notifications/settings'
        },
        SETTINGS: {
            GET: '/api/v1/settings',
            UPDATE: '/api/v1/settings/update',
            THEME: '/api/v1/settings/theme',
            LANGUAGE: '/api/v1/settings/language',
            PRIVACY: '/api/v1/settings/privacy',
            NOTIFICATIONS: '/api/v1/settings/notifications'
        },
        ADMIN: {
            DASHBOARD: '/api/v1/admin/dashboard',
            USERS: '/api/v1/admin/users',
            BAN_USER: '/api/v1/admin/ban/:id',
            UNBAN_USER: '/api/v1/admin/unban/:id',
            STATS: '/api/v1/admin/stats',
            LOGS: '/api/v1/admin/logs',
            BACKUP: '/api/v1/admin/backup',
            RESTORE: '/api/v1/admin/restore'
        }
    },
    
    // ==================== SOCKET EVENTS ====================
    SOCKET_EVENTS: {
        // Connection
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        CONNECT_ERROR: 'connect_error',
        RECONNECT: 'reconnect',
        
        // Authentication
        AUTHENTICATE: 'authenticate',
        AUTHENTICATED: 'authenticated',
        UNAUTHORIZED: 'unauthorized',
        
        // User
        USER_ONLINE: 'user_online',
        USER_OFFLINE: 'user_offline',
        USER_TYPING: 'user_typing',
        USER_STOPPED_TYPING: 'user_stopped_typing',
        USER_STATUS_CHANGE: 'user_status_change',
        USER_PROFILE_UPDATE: 'user_profile_update',
        
        // Messages
        MESSAGE_SEND: 'message_send',
        MESSAGE_RECEIVE: 'message_receive',
        MESSAGE_DELIVERED: 'message_delivered',
        MESSAGE_READ: 'message_read',
        MESSAGE_DELETE: 'message_delete',
        MESSAGE_EDIT: 'message_edit',
        MESSAGE_REACTION: 'message_reaction',
        
        // Groups
        GROUP_JOIN: 'group_join',
        GROUP_LEAVE: 'group_leave',
        GROUP_UPDATE: 'group_update',
        GROUP_MEMBER_ADD: 'group_member_add',
        GROUP_MEMBER_REMOVE: 'group_member_remove',
        GROUP_MESSAGE: 'group_message',
        
        // Calls
        CALL_INITIATE: 'call_initiate',
        CALL_ACCEPT: 'call_accept',
        CALL_REJECT: 'call_reject',
        CALL_END: 'call_end',
        CALL_OFFER: 'call_offer',
        CALL_ANSWER: 'call_answer',
        CALL_ICE_CANDIDATE: 'call_ice_candidate',
        
        // Notifications
        NOTIFICATION_NEW: 'notification_new',
        NOTIFICATION_READ: 'notification_read',
        NOTIFICATION_DELETE: 'notification_delete',
        
        // System
        PING: 'ping',
        PONG: 'pong',
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        MAINTENANCE: 'maintenance'
    },
    
    // ==================== STATUS CODES ====================
    STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        CONFLICT: 409,
        TOO_MANY_REQUESTS: 429,
        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    },
    
    // ==================== MIME TYPES ====================
    MIME_TYPES: {
        IMAGES: {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'bmp': 'image/bmp',
            'webp': 'image/webp',
            'svg': 'image/svg+xml',
            'ico': 'image/x-icon'
        },
        VIDEOS: {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
            'mov': 'video/quicktime',
            'avi': 'video/x-msvideo',
            'wmv': 'video/x-ms-wmv',
            'flv': 'video/x-flv',
            'mkv': 'video/x-matroska'
        },
        AUDIO: {
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'ogg': 'audio/ogg',
            'm4a': 'audio/mp4',
            'aac': 'audio/aac',
            'flac': 'audio/flac',
            'opus': 'audio/opus',
            'weba': 'audio/webm'
        },
        DOCUMENTS: {
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'txt': 'text/plain',
            'csv': 'text/csv',
            'json': 'application/json',
            'xml': 'application/xml',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed',
            '7z': 'application/x-7z-compressed',
            'tar': 'application/x-tar',
            'gz': 'application/gzip'
        }
    },
    
    // ==================== COUNTRY CODES ====================
    COUNTRY_CODES: {
        'ID': '+62',
        'US': '+1',
        'GB': '+44',
        'SG': '+65',
        'MY': '+60',
        'AU': '+61',
        'JP': '+81',
        'KR': '+82',
        'CN': '+86',
        'IN': '+91'
    },
    
    // ==================== TIMEZONES ====================
    TIMEZONES: [
        'Asia/Jakarta',
        'Asia/Singapore',
        'Asia/Tokyo',
        'Asia/Seoul',
        'Asia/Shanghai',
        'Asia/Kuala_Lumpur',
        'Asia/Bangkok',
        'Asia/Manila',
        'Asia/Ho_Chi_Minh',
        'Asia/Dhaka',
        'Asia/Kolkata',
        'Asia/Dubai',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Europe/Moscow',
        'America/New_York',
        'America/Los_Angeles',
        'America/Chicago',
        'America/Toronto',
        'Australia/Sydney',
        'Pacific/Auckland'
    ],
    
    // ==================== LANGUAGES ====================
    LANGUAGES: [
        { code: 'en', name: 'English' },
        { code: 'id', name: 'Indonesian' },
        { code: 'ms', name: 'Malay' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'ru', name: 'Russian' },
        { code: 'ar', name: 'Arabic' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'it', name: 'Italian' },
        { code: 'nl', name: 'Dutch' },
        { code: 'tr', name: 'Turkish' },
        { code: 'vi', name: 'Vietnamese' },
        { code: 'th', name: 'Thai' },
        { code: 'hi', name: 'Hindi' }
    ],
    
    // ==================== CURRENCIES ====================
    CURRENCIES: [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
        { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'RUB', symbol: '₽', name: 'Russian Ruble' }
    ],
    
    // ==================== VERSION HISTORY ====================
    VERSION_HISTORY: [
        { version: '9.66.0', date: '2026-02-08', changes: ['Initial release', 'Complete chat system', 'All features implemented'] },
        { version: '9.65.0', date: '2026-01-25', changes: ['Beta testing', 'Bug fixes', 'Performance improvements'] },
        { version: '9.60.0', date: '2026-01-10', changes: ['Alpha version', 'Core functionality', 'Basic chat features'] }
    ],
    
    // ==================== CONTRIBUTORS ====================
    CONTRIBUTORS: [
        { name: 'Epan', role: 'Creator & Lead Developer', email: 'epan@primex.com' },
        { name: 'PrimeX AI', role: 'AI Assistant & Code Generator', email: 'ai@primex.com' },
        { name: 'Community', role: 'Beta Testers & Feedback', email: 'community@primex.com' }
    ],
    
    // ==================== SPECIAL THANKS ====================
    SPECIAL_THANKS: [
        'Node.js Community',
        'MongoDB Team',
        'Socket.IO Developers',
        'Express.js Maintainers',
        'All Open Source Contributors',
        'PrimeX Grup Early Users'
    ]
};