import bcrypt from 'bcrypt';
import crypto from "crypto";
import mongoose from 'mongoose';
import { Role } from './role.js';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return v.length > 2 && v.length <= 70;
            },
            message: props => `${props.value} is not a valid name! Name must be between 3 and 70 characters.`
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 1,
        // 1 = user
        // 2 = admin
    },

    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }],

    location: {
        type: {
            type: String,
            required: true,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: validateGeoJsonCoordinates,
                message: '{VALUE} is not a valid longitude/latitude(/altitude) coordinates array'
            }
        }
    }

}, {
    timestamps: true,
    collection: "users",
    discriminatorKey: 'type'
});

userSchema.index({ location: '2dsphere' });

// Validate a GeoJSON coordinates array (longitude, latitude and optional altitude).
function validateGeoJsonCoordinates(value) {
    return Array.isArray(value) && value.length >= 2 && value.length <= 3 && isLongitude(value[0]) && isLatitude(value[1]);
}

function isLatitude(value) {
    return value >= -90 && value <= 90;
}

function isLongitude(value) {
    return value >= -180 && value <= 180;
}

userSchema.statics.findOneByUsername = function(username) {
    return this.findOne({ username: username });
};

userSchema.statics.createFake = async function({ password = "test", role = Role.USER } = {}) {
    const username = crypto.randomBytes(20).toString('hex');
    return await this.create({
        username: username,
        password: password,
        role: role,
        location: {
            type: "Point",
            coordinates: [0, 0]
        }
    });
};

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    return bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
}

userSchema.methods.is = function(role) {
    return (this.role & role) ? true : false;
}

export default mongoose.model('User', userSchema);