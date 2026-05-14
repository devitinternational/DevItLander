"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export type PolicyType = "Privacy Policy" | "Terms of Service" | "Cookie Policy" | null;

interface LegalDialogProps {
  policy: PolicyType;
  onClose: () => void;
}

export function LegalDialog({ policy, onClose }: LegalDialogProps) {
  return (
    <Dialog open={!!policy} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] h-full flex flex-col p-0 bg-background/95 backdrop-blur-md border-border/50">
        <DialogHeader className="px-6 py-6 sm:px-8 sm:py-8 border-b border-border/20">
          <DialogTitle className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
            {policy === "Privacy Policy" && "Privacy Policy"}
            {policy === "Terms of Service" && "Terms & Conditions"}
            {policy === "Cookie Policy" && "Cookie Policy"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground mt-2">
            DevIt International | Effective Date: 1 April 2025
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-6 sm:px-8 text-foreground/80">
          <div className="max-w-none pb-8 text-sm sm:text-base leading-relaxed">
            {policy === "Cookie Policy" && <CookiePolicyContent />}
            {policy === "Terms of Service" && <TermsPolicyContent />}
            {policy === "Privacy Policy" && <PrivacyPolicyContent />}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-8 mb-4">{children}</h3>;
}

function SectionText({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 leading-relaxed">{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="pl-1 shrink-0">{children}</li>;
}

function ContactDetails() {
  return (
    <div className="bg-muted/30 p-4 rounded-lg mt-4 w-fit">
      <p className="font-semibold text-foreground mb-1">DevIt International</p>
      <p>
        Email:{" "}
        <a
          href="mailto:support@devitinternational.com"
          className="text-primary hover:underline"
        >
          support@devitinternational.com
        </a>
      </p>
      <p>
        Website:{" "}
        <a
          href="https://www.devitinternational.com"
          className="text-primary hover:underline"
        >
          www.devitinternational.com
        </a>
      </p>
    </div>
  );
}

// ============================================================================
// COOKIE POLICY TEXT
// ============================================================================
function CookiePolicyContent() {
  return (
    <div className="animate-in fade-in duration-500">
      <SectionText>
        This Cookie Policy explains how DevIt International ("we", "us", or "our") uses cookies and similar tracking technologies on devitinternational.com (the "Website"). It should be read alongside our Privacy Policy.
      </SectionText>
      <SectionText>
        By continuing to use our Website, you consent to the use of cookies as described in this policy. You may withdraw your consent at any time by adjusting your browser settings or using the cookie preference controls on our Website.
      </SectionText>

      <SectionTitle>1. What Are Cookies?</SectionTitle>
      <SectionText>
        Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to website owners.
      </SectionText>
      <SectionText>
        Cookies can be 'session cookies' (deleted when you close your browser) or 'persistent cookies' (which remain on your device for a set period or until manually deleted).
      </SectionText>

      <SectionTitle>2. Types of Cookies We Use</SectionTitle>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground">Strictly Necessary Cookies</h4>
          <SectionText>These cookies are essential for the Website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling in forms. Without these cookies, parts of the Website may not work.</SectionText>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Analytics Cookies</h4>
          <SectionText>These cookies allow us to count visits and traffic sources so we can measure and improve Website performance. All information collected is aggregated and anonymised. We use Google Analytics for this purpose.</SectionText>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Functional Cookies</h4>
          <SectionText>These cookies enable enhanced functionality, such as remembering your preferences (e.g. cookie consent choices). If you disable these cookies, some services may not function as expected.</SectionText>
        </div>
      </div>

      <SectionTitle>3. Cookies We Use</SectionTitle>
      <SectionText>The following table lists the specific cookies used on our Website:</SectionText>
      <div className="overflow-x-auto my-6 border border-border/30 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 text-foreground">
              <th className="p-3 border-b border-border/30 font-semibold text-sm">Cookie Name</th>
              <th className="p-3 border-b border-border/30 font-semibold text-sm">Type</th>
              <th className="p-3 border-b border-border/30 font-semibold text-sm">Purpose</th>
              <th className="p-3 border-b border-border/30 font-semibold text-sm">Duration</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-3 border-b border-border/20 font-mono">_ga</td>
              <td className="p-3 border-b border-border/20">Analytics</td>
              <td className="p-3 border-b border-border/20">Google Analytics — distinguishes users</td>
              <td className="p-3 border-b border-border/20">2 years</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-border/20 font-mono">_gid</td>
              <td className="p-3 border-b border-border/20">Analytics</td>
              <td className="p-3 border-b border-border/20">Google Analytics — distinguishes users</td>
              <td className="p-3 border-b border-border/20">24 hours</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-border/20 font-mono">_gat</td>
              <td className="p-3 border-b border-border/20">Analytics</td>
              <td className="p-3 border-b border-border/20">Google Analytics — throttles request rate</td>
              <td className="p-3 border-b border-border/20">1 minute</td>
            </tr>
            <tr>
              <td className="p-3 border-b border-border/20 font-mono">cookie_consent</td>
              <td className="p-3 border-b border-border/20">Functional</td>
              <td className="p-3 border-b border-border/20">Stores your cookie consent preference</td>
              <td className="p-3 border-b border-border/20">1 year</td>
            </tr>
            <tr>
              <td className="p-3 font-mono">session_id</td>
              <td className="p-3">Strictly Necessary</td>
              <td className="p-3">Maintains your session on the Website</td>
              <td className="p-3">Session</td>
            </tr>
          </tbody>
        </table>
      </div>
      <SectionText>Please note this list may be updated from time to time as we adjust our services and technology stack.</SectionText>

      <SectionTitle>4. Third-Party Cookies</SectionTitle>
      <SectionText>Some cookies on our Website are set by third-party services. These include:</SectionText>
      <List>
        <ListItem><strong className="text-foreground">Google Analytics</strong> — for website usage analytics. Google's privacy policy is available at policies.google.com/privacy</ListItem>
        <ListItem><strong className="text-foreground">Payment processors</strong> — if you make a payment through our Website, the payment gateway may set cookies to facilitate secure transactions</ListItem>
      </List>
      <SectionText>We do not control third-party cookies and recommend reviewing the respective third-party privacy and cookie policies for more information.</SectionText>

      <SectionTitle>5. How to Control Cookies</SectionTitle>
      <SectionText>You can control and manage cookies in several ways:</SectionText>
      <div className="space-y-2 mt-4 mb-4">
        <h4 className="font-medium text-foreground">Browser Settings</h4>
        <SectionText>Most browsers allow you to view, block, or delete cookies. Instructions for common browsers:</SectionText>
        <List>
          <ListItem><strong>Google Chrome:</strong> Settings {">"} Privacy and Security {">"} Cookies and other site data</ListItem>
          <ListItem><strong>Mozilla Firefox:</strong> Options {">"} Privacy & Security {">"} Cookies and Site Data</ListItem>
          <ListItem><strong>Safari:</strong> Preferences {">"} Privacy {">"} Manage Website Data</ListItem>
          <ListItem><strong>Microsoft Edge:</strong> Settings {">"} Cookies and site permissions</ListItem>
        </List>
        <SectionText>Please note that blocking all cookies may affect the functionality of this and other websites.</SectionText>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="font-medium text-foreground">Opt Out of Google Analytics</h4>
        <SectionText>You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on, available at tools.google.com/dlpage/gaoptout.</SectionText>
      </div>

      <SectionTitle>6. Cookie Consent</SectionTitle>
      <SectionText>When you first visit our Website, you will be presented with a cookie consent banner. You may accept all cookies, adjust your preferences, or reject non-essential cookies. Your preference will be stored via a functional cookie for one year.</SectionText>
      <SectionText>You may change your cookie preferences at any time by clearing your browser cookies and revisiting the Website, or through the cookie settings link in our Website footer.</SectionText>

      <SectionTitle>7. Updates to This Policy</SectionTitle>
      <SectionText>We may update this Cookie Policy periodically to reflect changes in technology, regulation, or our practices. When we do, we will revise the effective date at the top of this page. We encourage you to review this policy from time to time.</SectionText>

      <SectionTitle>8. Contact Us</SectionTitle>
      <SectionText>If you have any questions about how we use cookies, please contact us at:</SectionText>
      <ContactDetails />
    </div>
  );
}

// ============================================================================
// TERMS & CONDITIONS TEXT
// ============================================================================
function TermsPolicyContent() {
  return (
    <div className="animate-in fade-in duration-500">
      <SectionText>
        These Terms and Conditions ("Terms") govern your use of the website located at devitinternational.com ("Website"), operated by DevIt International ("we", "us", or "our"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.
      </SectionText>

      <SectionTitle>1. About Us</SectionTitle>
      <SectionText>
        DevIt International is a software development studio based in Malaysia, specialising in websites, web applications, and mobile app development. Our registered business operates in accordance with Malaysian law.
      </SectionText>

      <SectionTitle>2. Use of the Website</SectionTitle>
      <h4 className="font-medium text-foreground mt-4 mb-2">2.1 Permitted Use</h4>
      <SectionText>You may use the Website for lawful purposes only. You agree not to:</SectionText>
      <List>
        <ListItem>Use the Website in any way that violates applicable local, national, or international law or regulation</ListItem>
        <ListItem>Transmit any unsolicited or unauthorised advertising or promotional material</ListItem>
        <ListItem>Attempt to gain unauthorised access to any part of the Website or its related systems</ListItem>
        <ListItem>Use automated tools (bots, scrapers, crawlers) to extract data from the Website without our express written permission</ListItem>
        <ListItem>Transmit any material that is defamatory, offensive, or otherwise objectionable</ListItem>
      </List>

      <h4 className="font-medium text-foreground mt-4 mb-2">2.2 Intellectual Property</h4>
      <SectionText>
        All content on the Website — including text, graphics, logos, images, and software — is the property of DevIt International or its content suppliers and is protected by Malaysian and international intellectual property laws.
      </SectionText>
      <SectionText>
        You may not reproduce, distribute, modify, or create derivative works from any Website content without our prior written consent.
      </SectionText>

      <SectionTitle>3. Services</SectionTitle>
      <SectionText>
        DevIt International offers software development services including, but not limited to, website development, web application development, and mobile application development. Any services engaged beyond the Website will be governed by a separate written agreement (e.g. proposal, service agreement, or statement of work) between DevIt International and the client.
      </SectionText>
      <SectionText>
        These Terms do not constitute a service agreement and do not create any obligation on our part to provide services.
      </SectionText>

      <SectionTitle>4. Enquiries and Communications</SectionTitle>
      <SectionText>When you submit an enquiry through our Website, you acknowledge that:</SectionText>
      <List>
        <ListItem>You are providing accurate and truthful information</ListItem>
        <ListItem>We may contact you using the details provided to respond to your enquiry</ListItem>
        <ListItem>Submission of an enquiry does not create a contractual relationship or guarantee of service delivery</ListItem>
      </List>

      <SectionTitle>5. Payments</SectionTitle>
      <SectionText>Where the Website facilitates payment for services:</SectionText>
      <List>
        <ListItem>All prices are quoted in Malaysian Ringgit (MYR) unless otherwise stated</ListItem>
        <ListItem>Payments are processed through third-party payment gateways. By making a payment, you also agree to the terms of the relevant payment processor</ListItem>
        <ListItem>We reserve the right to amend our pricing at any time. Changes will not affect services already confirmed by written agreement</ListItem>
        <ListItem>Refunds, if applicable, are governed by the terms set out in your service agreement with us</ListItem>
      </List>

      <SectionTitle>6. Third-Party Links</SectionTitle>
      <SectionText>
        The Website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content or availability of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
      </SectionText>

      <SectionTitle>7. Disclaimers</SectionTitle>
      <h4 className="font-medium text-foreground mt-4 mb-2">7.1 Website Availability</h4>
      <SectionText>
        We do not guarantee that the Website will be available at all times or that it will be free from errors or interruptions. We reserve the right to suspend, withdraw, or restrict access to the Website at any time without notice.
      </SectionText>

      <h4 className="font-medium text-foreground mt-4 mb-2">7.2 Accuracy of Information</h4>
      <SectionText>
        While we endeavour to keep the information on the Website accurate and up to date, we make no representations or warranties of any kind regarding the completeness, accuracy, or suitability of the content for any particular purpose.
      </SectionText>

      <h4 className="font-medium text-foreground mt-4 mb-2">7.3 No Professional Advice</h4>
      <SectionText>
        Content on the Website is provided for general informational purposes only and does not constitute legal, financial, technical, or any other form of professional advice.
      </SectionText>

      <SectionTitle>8. Limitation of Liability</SectionTitle>
      <SectionText>
        To the fullest extent permitted by Malaysian law, DevIt International shall not be liable for any indirect, incidental, special, or consequential damages arising from:
      </SectionText>
      <List>
        <ListItem>Your use of or inability to use the Website</ListItem>
        <ListItem>Any errors, omissions, or inaccuracies in Website content</ListItem>
        <ListItem>Unauthorised access to or alteration of your data</ListItem>
        <ListItem>Any other matter relating to the Website</ListItem>
      </List>
      <SectionText>
        Our total aggregate liability to you in connection with the Website shall not exceed MYR 500.
      </SectionText>

      <SectionTitle>9. Indemnification</SectionTitle>
      <SectionText>
        You agree to indemnify, defend, and hold harmless DevIt International and its directors, employees, and agents from and against any claims, liabilities, damages, costs, and expenses (including legal fees) arising from your use of the Website or breach of these Terms.
      </SectionText>

      <SectionTitle>10. Privacy</SectionTitle>
      <SectionText>
        Your use of the Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Website, you consent to our data practices as described in the Privacy Policy.
      </SectionText>

      <SectionTitle>11. Governing Law and Dispute Resolution</SectionTitle>
      <SectionText>
        These Terms are governed by the laws of Malaysia. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.
      </SectionText>
      <SectionText>
        We encourage you to contact us directly to resolve any concerns before initiating formal proceedings.
      </SectionText>

      <SectionTitle>12. Changes to These Terms</SectionTitle>
      <SectionText>
        We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of the Website after any changes constitutes acceptance of the revised Terms.
      </SectionText>

      <SectionTitle>13. Severability</SectionTitle>
      <SectionText>
        If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
      </SectionText>

      <SectionTitle>14. Entire Agreement</SectionTitle>
      <SectionText>
        These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and us regarding your use of the Website and supersede any prior agreements or understandings.
      </SectionText>

      <SectionTitle>15. Contact Us</SectionTitle>
      <SectionText>If you have any questions about these Terms, please contact us at:</SectionText>
      <ContactDetails />
    </div>
  );
}

// ============================================================================
// PRIVACY POLICY TEXT
// ============================================================================
function PrivacyPolicyContent() {
  return (
    <div className="animate-in fade-in duration-500">
      <SectionText>
        DevIt International ("we", "us", or "our") is committed to protecting the personal data of everyone who visits devitinternational.com (the "Website"). This Privacy Policy explains what information we collect, how we use it, and your rights under applicable law — including Malaysia's Personal Data Protection Act 2010 (PDPA).
      </SectionText>
      <SectionText>
        By using our Website, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Website.
      </SectionText>

      <SectionTitle>1. Information We Collect</SectionTitle>
      <h4 className="font-medium text-foreground mt-4 mb-2">1.1 Information You Provide Directly</h4>
      <SectionText>When you fill out our contact form or engage with us through the Website, we may collect:</SectionText>
      <List>
        <ListItem>Full name</ListItem>
        <ListItem>Email address</ListItem>
        <ListItem>Phone number</ListItem>
        <ListItem>Company name or project details</ListItem>
        <ListItem>Any other information you voluntarily submit</ListItem>
      </List>

      <h4 className="font-medium text-foreground mt-4 mb-2">1.2 Payment Information</h4>
      <SectionText>
        If you engage us for services and payment is processed through our Website or a linked payment gateway, we may collect billing details including name, billing address, and payment card information. Payment card data is processed by PCI-DSS compliant third-party payment processors. We do not store full card numbers on our servers.
      </SectionText>

      <h4 className="font-medium text-foreground mt-4 mb-2">1.3 Analytics & Usage Data</h4>
      <SectionText>We automatically collect certain data when you visit our Website, including:</SectionText>
      <List>
        <ListItem>IP address and approximate geographic location</ListItem>
        <ListItem>Browser type and version</ListItem>
        <ListItem>Pages visited and time spent on each page</ListItem>
        <ListItem>Referring URL</ListItem>
        <ListItem>Device type and operating system</ListItem>
      </List>
      <SectionText>
        This data is collected via tools such as Google Analytics and is used in aggregate form to improve our Website.
      </SectionText>

      <h4 className="font-medium text-foreground mt-4 mb-2">1.4 Cookies & Tracking Technologies</h4>
      <SectionText>
        We use cookies and similar technologies to enhance your browsing experience. Please refer to our Cookie Policy for full details.
      </SectionText>

      <SectionTitle>2. How We Use Your Information</SectionTitle>
      <SectionText>We use the information we collect for the following purposes:</SectionText>
      <List>
        <ListItem>To respond to your enquiries and provide our services</ListItem>
        <ListItem>To process payments and send billing-related communications</ListItem>
        <ListItem>To analyse Website performance and improve user experience</ListItem>
        <ListItem>To send service updates, project communications, or promotional content (where you have consented)</ListItem>
        <ListItem>To comply with legal obligations</ListItem>
        <ListItem>To detect and prevent fraud or security incidents</ListItem>
      </List>

      <SectionTitle>3. Legal Basis for Processing</SectionTitle>
      <SectionText>We process your personal data on the following legal grounds:</SectionText>
      <List>
        <ListItem><strong>Consent</strong> — where you have provided explicit consent (e.g. contact form submissions, marketing emails)</ListItem>
        <ListItem><strong>Contractual necessity</strong> — where processing is required to deliver services you have engaged us for</ListItem>
        <ListItem><strong>Legal obligation</strong> — where we are required to process data to comply with applicable law</ListItem>
        <ListItem><strong>Legitimate interests</strong> — for analytics and Website security, balanced against your rights</ListItem>
      </List>

      <SectionTitle>4. Sharing of Your Information</SectionTitle>
      <SectionText>We do not sell, rent, or trade your personal data. We may share your information only in the following circumstances:</SectionText>
      <List>
        <ListItem>With trusted third-party service providers (e.g. payment processors, analytics providers, cloud hosting) who are bound by data processing agreements</ListItem>
        <ListItem>With professional advisors (lawyers, accountants) under confidentiality obligations</ListItem>
        <ListItem>Where required by law, regulation, or valid legal process</ListItem>
        <ListItem>In connection with a merger, acquisition, or sale of assets, where the acquiring party agrees to uphold this policy</ListItem>
      </List>

      <SectionTitle>5. Data Retention</SectionTitle>
      <SectionText>
        We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy or as required by law. Contact enquiries are generally retained for up to 24 months. Payment records are retained for 7 years in compliance with Malaysian accounting regulations.
      </SectionText>

      <SectionTitle>6. Data Security</SectionTitle>
      <SectionText>
        We implement appropriate technical and organisational measures to protect your personal data from unauthorised access, disclosure, alteration, or destruction. These measures include SSL/TLS encryption, restricted staff access, and regular security reviews.
      </SectionText>
      <SectionText>
        No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
      </SectionText>

      <SectionTitle>7. Your Rights</SectionTitle>
      <SectionText>Under Malaysia's PDPA and applicable law, you have the right to:</SectionText>
      <List>
        <ListItem>Access the personal data we hold about you</ListItem>
        <ListItem>Correct inaccurate or incomplete data</ListItem>
        <ListItem>Withdraw consent at any time (where processing is based on consent)</ListItem>
        <ListItem>Object to processing for direct marketing purposes</ListItem>
        <ListItem>Request erasure of your data, subject to legal retention obligations</ListItem>
      </List>
      <SectionText>
        To exercise any of these rights, please contact us at legal@devitinternational.com. We will respond within 21 days.
      </SectionText>

      <SectionTitle>8. Third-Party Links</SectionTitle>
      <SectionText>
        Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies independently.
      </SectionText>

      <SectionTitle>9. International Data Transfers</SectionTitle>
      <SectionText>
        Your data may be processed or stored on servers located outside Malaysia (for example, through cloud services). Where this occurs, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection law.
      </SectionText>

      <SectionTitle>10. Children's Privacy</SectionTitle>
      <SectionText>
        Our Website is intended for use by adults. We do not knowingly collect personal data directly from children under the age of 18 without verifiable parental or guardian consent.
      </SectionText>
      <SectionText>
        Children under 18 may browse the Website under the supervision of a parent or legal guardian. If a parent or guardian is submitting information on behalf of a minor in connection with our services, they take responsibility for ensuring that the minor's data is shared appropriately and in accordance with this Privacy Policy.
      </SectionText>
      <SectionText>
        If you believe we have inadvertently collected personal data from a child without appropriate consent, please contact us at legal@devitinternational.com and we will take prompt steps to delete it.
      </SectionText>

      <SectionTitle>11. Changes to This Policy</SectionTitle>
      <SectionText>
        We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. Your continued use of the Website after any changes constitutes acceptance of the updated policy.
      </SectionText>

      <SectionTitle>12. Contact Us</SectionTitle>
      <SectionText>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</SectionText>
      <ContactDetails />
    </div>
  );
}
