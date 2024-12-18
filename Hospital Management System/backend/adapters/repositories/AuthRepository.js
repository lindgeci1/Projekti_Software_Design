require('dotenv').config(); // Load environment variables from .env file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../core/entities/User');
const Role = require('../../core/entities/Role');
const UserRole = require('../../core/entities/UserRole');
const JwtTokenGenerator = require('../../Utils/JWTUtils');  // Import the JwtTokenGenerator class
const TokenGenerator = require('../../Utils/tokenUtils');   // Import the TokenGenerator class
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Add this line to allow self-signed certificates
    }
});



const generateJWTToken = (user) => {
    // Create an instance of JwtTokenGenerator
    const jwtTokenGenerator = new JwtTokenGenerator();
   
    // Generate dynamic JWT token using the instance
    const { secret, algorithm } = jwtTokenGenerator.generateDynamicJwtToken();

    setJwtExpirationTimer('7200s', user);

    // Adding more data to the JWT payload
    return jwt.sign(
        {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        },
        secret, // Now using the dynamically generated secret
        { algorithm } // Using the dynamically generated algorithm
    );
};
const generateRefreshToken = (user) => {
    // Create an instance of TokenGenerator
    const tokenGenerator = new TokenGenerator();  // Instantiate the class here
   
    // Generate random token using the instance
    const { secret, algorithm } = tokenGenerator.generateRandomToken();

    setExpirationTimer('7d', user);

    return jwt.sign(
        { user_id: user.user_id },
        secret,
        { algorithm }
    );
};
const setJwtExpirationTimer = (expirationString, user) => {
    const expiresIn = parseExpirationString(expirationString); // Convert expiration string to milliseconds
    if (jwtExpirationTimer) {
        clearTimeout(jwtExpirationTimer.timer);
    }
    const renewalBuffer = 30000; // 30 seconds before actual expiration to attempt renewal
    const expirationTime = Date.now() + expiresIn - renewalBuffer;

    jwtExpirationTimer = {
        timer: setTimeout(() => {
            console.log(`JWT token is about to expire for user: ${user.username}`);
            // Renew JWT using refresh token
            renewJWT(user);
        }, expiresIn - renewalBuffer),
        expirationTime
    };
};
const setExpirationTimer = (expirationString, user) => {
    const expiresIn = parseExpirationString(expirationString); // Convert expiration string to milliseconds
    if (refreshTokenExpirationTimer) {
        clearTimeout(refreshTokenExpirationTimer.timer);
    }
    const expirationTime = Date.now() + expiresIn;
    refreshTokenExpirationTimer = {
        timer: setTimeout(() => {
            console.log(`Refresh token expired for user: ${user.username}`);
            refreshTokenExpirationTimer = null;
        }, expiresIn),
        expirationTime
    };
};
const parseExpirationString = (expirationString) => {
    const value = parseInt(expirationString);
    const unit = expirationString.slice(-1);
    switch (unit) {
        case 's':
            return value * 1000; // Convert seconds to milliseconds
        case 'm':
            return value * 60 * 1000; // Convert minutes to milliseconds
        case 'h':
            return value * 60 * 60 * 1000; // Convert hours to milliseconds
        case 'd':
            return value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        default:
            throw new Error('Invalid expiration string format');
    }
};
let refreshTokenExpirationTimer = null;
let jwtExpirationTimer = null;
const renewJWT = async (user) => {
    // Assume generateRefreshToken returns an object with a refreshToken and its own expiration
    if (!refreshTokenExpirationTimer || Date.now() >= refreshTokenExpirationTimer.expirationTime) {
        console.log('Refresh token is expired or missing. User must log in again.');
        return;
    }

    const newJwt = generateJWTToken(user);
    console.log(`New JWT generated for user: ${user.username}`);

    // Optionally, update any relevant state or database entries here
};




class AuthRepository {

   
     getExpirationTime(){
        if (!refreshTokenExpirationTimer) return null;
        if (Date.now() >= refreshTokenExpirationTimer.expirationTime) {
            refreshTokenExpirationTimer = null;
            return null;
        }
        return refreshTokenExpirationTimer.expirationTime;
    };
    getExpirationTimeJWT(){
        if (!jwtExpirationTimer) return null;
        if (Date.now() >= jwtExpirationTimer.expirationTime) {
            jwtExpirationTimer = null;
            return null;
        }
        return jwtExpirationTimer.expirationTime;
    };
    async  loginUser(req, res){
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username }, include: UserRole});
   
            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }
   
            const isPasswordValid = await bcrypt.compare(password, user.password);
   
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
           
           
            let roleName = null;
            if (user.UserRoles.length > 0) {
                const roleId = user.UserRoles[0].role_id;
                const role = await Role.findByPk(roleId);
                roleName = role ? role.role_name : null;
            }
   
            const token = jwt.sign(
                { userId: user.user_id, username: user.username, email: user.email, role: roleName },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            const authRepo = new AuthRepository();

            const token1 = generateJWTToken(user);//qita leje mos e hek se masanej ka infinit loop kur t kryhet jwt
           
            // Generate refresh token
            const refreshToken = generateRefreshToken(user);
   
            // Print refresh token to console
            // console.log('Refresh Token:', refreshToken);
   
            res.status(200).json({ token, token1, refreshToken, username: user.username, email: user.email });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   
    async registerUser(req, res){
        try {
            const { email, username, password } = req.body;
   
            console.log(req.body);
   
            // Validate required fields
            if (!email || !username || !password) {
                return res.status(400).json({ message: 'Email, username, and password are required' });
            }
   
            // Validate username length
            if (username.length < 2) {
                return res.status(400).json({ message: 'Username must be at least 2 characters long' });
            }
   
            // Validate email format
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z-]+\.[a-z]{3}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
   
            // Validate password complexity
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()\-_=+`~{}\[\]|\\:;"'<>,.?\/]{6,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
            }
   
            // Check if user already exists with the same email
            const existingUserWithEmail = await User.findOne({ where: { email } });
            if (existingUserWithEmail) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
   
            // Check if user already exists with the same username
            const existingUserWithUsername = await User.findOne({ where: { username } });
            if (existingUserWithUsername) {
                return res.status(400).json({ message: 'Username already exists' });
            }
   
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
   
            // Automatically assign role 'doctor' if the email contains a period before the '@'
            let assignedRole = 'patient'; // Default to 'patient'
            if (email.indexOf('.') !== -1 && email.indexOf('@') !== -1 && email.lastIndexOf('.', email.indexOf('@')) !== -1) {
                assignedRole = 'doctor'; // Assign 'doctor' role
            }
   
            // Create new user
            const newUser = await User.create({
                email,
                username,
                password: hashedPassword,
            });
   
            // Find the role by name
            const role = await Role.findOne({ where: { role_name: assignedRole } });
            if (!role) {
                return res.status(500).json({ message: 'Default role not found' });
            }
   
            // Assign the role to the user
            await UserRole.create({
                user_id: newUser.user_id,
                role_id: role.role_id,
            });
   
            // Generate JWT token
            const token = generateJWTToken(newUser);
   
            // Send welcome email
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: email,
                subject: 'Welcome to the Hospital Management System',
                text: `Dear ${username},
   
    Welcome to the LIFELINE Hospital! We are delighted to have you as a part of our community. Our system is designed to streamline hospital operations, improve patient care, and enhance communication within the healthcare environment.
   
    Your registration is now complete, and you can start exploring the features and services we offer.
   
    If you have any questions or need assistance, please do not hesitate to contact our support team.
   
    Thank you for joining us!
   
    Best regards,
    LIFELINE Hospital Team`
            };
   
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
   
            // Respond with success message and JWT token
            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            console.error('Error registering user:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
}
}
module.exports = new AuthRepository();
