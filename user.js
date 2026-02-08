const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    // Account Information
    userId: {
        type: String,
        unique: true,
        required: true,
        default: () => `PRIMEX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_.-]+$/.test(v);
            },
            message: 'Username can only contain letters, numbers, dots, dashes, and underscores'
        },
        index: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function(v) {
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
            },
            message: 'Invalid phone number format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    
    // Profile Information
    displayName: {
        type: String,
        required: true,
        maxlength: 50,
        default: function() {
            return this.username;
        }
    },
    avatar: {
        type: String,
        default: '/assets/images/default-avatar.png'
    },
    avatarThumbnail: String,
    banner: {
        type: String,
        default: '/assets/images/default-banner.jpg'
    },
    bio: {
        type: String,
        maxlength: 500,
        default: 'Member of PrimeX Grup - The Ultimate Chat Experience'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say', null],
        default: null
    },
    birthDate: Date,
    location: {
        city: String,
        country: String,
        timezone: String
    },
    
    // Account Status
    status: {
        type: String,
        enum: ['online', 'away', 'busy', 'invisible', 'offline'],
        default: 'offline'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    banReason: String,
    banExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'vip', 'moderator', 'admin', 'owner'],
        default: 'user'
    },
    
    // Preferences
    theme: {
        type: String,
        enum: ['dark', 'light', 'matrix', 'cyber', 'purple', 'blue', 'green'],
        default: 'dark'
    },
    language: {
        type: String,
        default: 'en'
    },
    notificationSettings: {
        messages: { type: Boolean, default: true },
        mentions: { type: Boolean, default: true },
        calls: { type: Boolean, default: true },
        sounds: { type: Boolean, default: true },
        vibration: { type: Boolean, default: true },
        emailNotifications: { type: Boolean, default: false }
    },
    privacySettings: {
        showOnlineStatus: { type: Boolean, default: true },
        showLastSeen: { type: Boolean, default: true },
        showReadReceipts: { type: Boolean, default: true },
        allowMessagesFrom: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' },
        profileVisibility: { type: String, enum: ['public', 'contacts', 'private'], default: 'public' }
    },
    
    // Chat Settings
    chatSettings: {
        enterToSend: { type: Boolean, default: true },
        showEmojis: { type: Boolean, default: true },
        showImages: { type: Boolean, default: true },
        autoDownloadMedia: { type: Boolean, default: false },
        fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
        messageHistory: { type: Number, default: 100 }
    },
    
    // Statistics
    messageCount: {
        type: Number,
        default: 0
    },
    mediaCount: {
        type: Number,
        default: 0
    },
    loginCount: {
        type: Number,
        default: 0
    },
    totalOnlineTime: {
        type: Number,
        default: 0 // in minutes
    },
    streakDays: {
        type: Number,
        default: 0
    },
    lastStreakUpdate: Date,
    
    // Activity Tracking
    lastLogin: {
        type: Date,
        default: Date.now
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    lastMessage: Date,
    lastUsernameChange: {
        type: Date,
        default: Date.now
    },
    lastProfileUpdate: Date,
    lastPasswordChange: Date,
    
    // Connection Info
    currentSocketId: String,
    deviceInfo: {
        platform: String,
        browser: String,
        version: String,
        isMobile: Boolean,
        ipAddress: String,
        userAgent: String
    },
    activeSessions: [{
        socketId: String,
        loginTime: Date,
        deviceInfo: Object,
        ipAddress: String
    }],
    
    // Social
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
        sentAt: Date
    }],
    
    // Security
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: String,
    backupCodes: [String],
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    passwordHistory: [{
        password: String,
        changedAt: Date
    }],
    
    // Metadata
    joinDate: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    createdBy: {
        type: String,
        default: 'system'
    },
    updatedBy: String,
    tags: [String],
    notes: String,
    
    // Custom Fields
    customFields: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
userSchema.virtual('age').get(function() {
    if (!this.birthDate) return null;
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

userSchema.virtual('isOnlineNow').get(function() {
    if (!this.lastSeen) return false;
    const now = new Date();
    const lastSeen = new Date(this.lastSeen);
    return (now - lastSeen) < 300000; // 5 minutes
});

userSchema.virtual('accountAge').get(function() {
    const now = new Date();
    const joinDate = new Date(this.joinDate);
    const diff = now - joinDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // days
});

// Indexes
userSchema.index({ username: 'text', displayName: 'text', bio: 'text' });
userSchema.index({ status: 1, lastSeen: -1 });
userSchema.index({ 'deviceInfo.ipAddress': 1 });
userSchema.index({ createdAt: -1 });

// Middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        
        // Save to password history (keep last 5 passwords)
        if (this.passwordHistory.length >= 5) {
            this.passwordHistory.shift();
        }
        this.passwordHistory.push({
            password: this.password,
            changedAt: new Date()
        });
        
        this.lastPasswordChange = new Date();
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre('save', function(next) {
    if (this.isModified('displayName') && this.displayName !== this.username) {
        this.lastUsernameChange = new Date();
    }
    next();
});

// Methods
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isLocked = function() {
    return this.lockUntil && this.lockUntil > Date.now();
};

userSchema.methods.incrementLoginAttempts = function() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    if (this.loginAttempts + 1 >= 5) {
        updates.$set = { lockUntil: Date.now() + 60 * 60 * 1000 }; // 1 hour
    }
    return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
    });
};

userSchema.methods.generateUsernameChangeCode = function() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
};

userSchema.methods.canChangeUsername = function() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.lastUsernameChange <= oneWeekAgo;
};

// Static Methods
userSchema.statics.findByEmailOrPhone = function(identifier) {
    return this.findOne({
        $or: [
            { email: identifier },
            { phone: identifier },
            { username: identifier }
        ]
    });
};

userSchema.statics.getOnlineUsers = function() {
    return this.find({
        status: 'online',
        lastSeen: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
    });
};

module.exports = mongoose.model('User', userSchema);