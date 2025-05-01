import React from 'react';
import { Typography, Box } from '@mui/material';

const PrivacyPolicy = () => (
  <Box p={3} mb={3}> {/* Added margin-bottom to create space below */}
    <Typography variant="h5" gutterBottom>
      Privacy Policy
    </Typography>

    <Typography variant="subtitle2" gutterBottom>
      Last updated on May 1, 2025
    </Typography>

    <Typography paragraph>
      At GetFit, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
    </Typography>

    <Typography variant="h6" gutterBottom>1. Information We Collect</Typography>
    <Typography paragraph>
      Personal Information: Name, email address, phone number, and gym/business details when you register or use our services.<br />
      Member Data: Gym members' names, contact information, membership plans, and attendance logs (uploaded by gym owners).<br />
      Payment Information: Through Razorpay, we may collect transaction IDs and payment statuses. We do not store card or banking details.<br />
      Device & Usage Data: IP address, browser type, pages visited, access times, and referring links to help improve user experience.
    </Typography>

    <Typography variant="h6" gutterBottom>2. How We Use Your Information</Typography>
    <Typography paragraph>
      We use your data to:
      <ul>
        <li>Provide and manage your account on GetFit.</li>
        <li>Enable gym owners to manage member data, plans, and notifications.</li>
        <li>Process payments and invoices securely through Razorpay.</li>
        <li>Send alerts, notifications, or service-related communications.</li>
        <li>Improve the performance and user experience of our app.</li>
      </ul>
    </Typography>

    <Typography variant="h6" gutterBottom>3. Data Sharing and Disclosure</Typography>
    <Typography paragraph>
      We do not sell, rent, or trade your personal data. We may share your data with:
      <ul>
        <li>Razorpay for processing payments.</li>
        <li>Service providers that help us maintain and operate the platform (under strict confidentiality).</li>
        <li>Legal authorities, if required by law or to enforce our Terms & Conditions.</li>
      </ul>
    </Typography>

    <Typography variant="h6" gutterBottom>4. Data Security</Typography>
    <Typography paragraph>
      We take data security seriously. We implement appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
      However, no digital transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
    </Typography>

    <Typography variant="h6" gutterBottom>5. Cookies and Tracking</Typography>
    <Typography paragraph>
      We may use cookies or similar technologies to enhance user experience, track sessions, and analyze traffic. You can choose to disable cookies in your browser settings.
    </Typography>

    <Typography variant="h6" gutterBottom>6. Your Rights</Typography>
    <Typography paragraph>
      You have the right to:
      <ul>
        <li>Access, update, or delete your personal information.</li>
        <li>Opt out of marketing communications.</li>
        <li>Request a copy of the data we store about you.</li>
      </ul>
      To make such requests, contact us at yashwantk784@gmail.com.
    </Typography>

    <Typography variant="h6" gutterBottom>7. Children's Privacy</Typography>
    <Typography paragraph>
      Our platform is not intended for children under the age of 13. We do not knowingly collect data from children.
    </Typography>

    <Typography variant="h6" gutterBottom>8. Changes to This Policy</Typography>
    <Typography paragraph>
      We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
    </Typography>

    <Typography variant="h6" gutterBottom>9. Contact Us</Typography>
    <Typography paragraph>
      If you have any questions about this Privacy Policy, please contact us:
      <br />
      📧 Email: yashwantk784@gmail.com<br />
      📞 Phone: +91 83282 99547
    </Typography>
  </Box>
);

export default PrivacyPolicy;
