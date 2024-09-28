const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      dealerId: user.dealerId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, dealerId, role } = req.body;

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Validate dealerId
    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
    });
    if (!dealer) {
      return res.status(400).json({ error: "Invalid dealer ID" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        dealerId: dealerId,
        role: role || "USER",
      },
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        dealerId: user.dealerId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
