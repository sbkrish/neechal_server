import { rateLimit } from 'express-rate-limit'

const registrationLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 5 minutes
    max: 10, // Limit each IP to 10 registration requests per `windowMs`
    handler: (req, res) => {
        res.status(429).json({
          message: "Too many registration attempts from this IP. Please try again later."
        });
      },
    standardHeaders: 'draft-7', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  export const newsletterLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 5 minutes
    max: 15, // Limit each IP to 15 registration requests per `windowMs`
    handler: (req, res) => {
        res.status(429).json({
          message: "Too many registration attempts from this IP. Please try again later."
        });
      },
    standardHeaders: 'draft-7', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  export default registrationLimiter;