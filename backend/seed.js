
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBj3640UPz59Cj8eP8yVq_U7oPQpvehR0g",
    authDomain: "kagi-email-app.firebaseapp.com",
    projectId: "kagi-email-app",
    storageBucket: "kagi-email-app.firebasestorage.app",
    messagingSenderId: "964381072526",
    appId: "1:964381072526:web:d8d4eb9d30e728b482bddf",
    measurementId: "G-HCT6J0BEQY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const seedData = [
    {
        "index": 1,
        "date": "2025-05-07T08:23:17.452Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "📆 Weekly sync notes and feedback",
        "body": "Hey team, please review the notes from today's sync. I've attached the main discussion points and action items from our meeting this morning. There were several important decisions made regarding the Q2 roadmap that need your attention.\n\nLet me know if you have any comments before EOD. We'll need to finalize these points by tomorrow to stay on schedule with the product launch timeline. Feel free to add any additional insights I might have missed during the discussion."
    },
    {
        "index": 2,
        "date": "2025-05-07T08:23:17.452Z",
        "deleted": true,
        "encrypted": false,
        "folder": "trash",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "📆 Weekly sync notes and feedback",
        "body": "Hey team, please review the notes from today's sync. I've attached the main discussion points and action items from our meeting this morning. There were several important decisions made regarding the Q2 roadmap that need your attention.\n\nLet me know if you have any comments before EOD. We'll need to finalize these points by tomorrow to stay on schedule with the product launch timeline. Feel free to add any additional insights I might have missed during the discussion."
    },
    {
        "index": 3,
        "date": "2025-05-06T19:12:56.302Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "🎨 Draft design files attached",
        "body": "Hi, I've attached the draft files for review. These include the updated wireframes for the dashboard, user flow diagrams, and preliminary color schemes we discussed in our last meeting. I've incorporated the feedback from the client and made several adjustments to the navigation structure.\n\nLet me know if these align with the current direction. I'm particularly interested in your thoughts on the mobile responsiveness approach and the new iconography system I've proposed. If approved, I can begin working on the high-fidelity mockups by next week."
    },
    {
        "index": 4,
        "date": "2025-05-06T19:12:56.302Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "🎨 Draft design files attached",
        "body": "Hi, I've attached the draft files for review. These include the updated wireframes for the dashboard, user flow diagrams, and preliminary color schemes we discussed in our last meeting. I've incorporated the feedback from the client and made several adjustments to the navigation structure.\n\nLet me know if these align with the current direction. I'm particularly interested in your thoughts on the mobile responsiveness approach and the new iconography system I've proposed. If approved, I can begin working on the high-fidelity mockups by next week."
    },
    {
        "index": 5,
        "date": "2025-05-05T15:32:09.742Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "Re: 💭 Questions about timeline",
        "body": "Thanks for the update. I appreciate you sending over the project requirements in such detail. This gives us a much clearer picture of what needs to be accomplished in the coming weeks.\n\nI'll follow up with the dev team and get you a clear timeline by tomorrow. We'll need to coordinate between the frontend and backend teams to ensure we're aligned on the implementation approach. There might be some resource constraints with the upcoming holiday season, but I'll make sure we account for that in our planning."
    },
    {
        "index": 6,
        "date": "2025-05-05T15:32:09.742Z",
        "deleted": true,
        "encrypted": false,
        "folder": "trash",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "demo@kagi.com",
        "subject": "Re: 💭 Questions about timeline",
        "body": "Thanks for the update. I appreciate you sending over the project requirements in such detail. This gives us a much clearer picture of what needs to be accomplished in the coming weeks.\n\nI'll follow up with the dev team and get you a clear timeline by tomorrow. We'll need to coordinate between the frontend and backend teams to ensure we're aligned on the implementation approach. There might be some resource constraints with the upcoming holiday season, but I'll make sure we account for that in our planning."
    },
    {
        "index": 7,
        "date": "2025-05-04T09:47:23.127Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "🧾 Invoice for April",
        "body": "Attached is the invoice for services rendered in April. The document includes a detailed breakdown of all billable hours, categorized by project phase and team member. You'll notice we've also included the additional consulting sessions that were requested mid-month.\n\n\nLet me know if you need any adjustments. If everything looks correct, payment is due within 30 days as per our agreement. We can also set up a call to discuss any questions you might have about specific line items or to plan for next month's resource allocation."
    },
    {
        "index": 8,
        "date": "2025-05-04T09:47:23.127Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "🧾 Invoice for April",
        "body": "Attached is the invoice for services rendered in April. The document includes a detailed breakdown of all billable hours, categorized by project phase and team member. You'll notice we've also included the additional consulting sessions that were requested mid-month.\n\n\nLet me know if you need any adjustments. If everything looks correct, payment is due within 30 days as per our agreement. We can also set up a call to discuss any questions you might have about specific line items or to plan for next month's resource allocation."
    },
    {
        "index": 9,
        "date": "2025-05-03T05:56:14.290Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "demo@kagi.com",
        "subject": "🏃‍♀️ Quick update on deliverables",
        "body": "We're tracking well against the deadline. After reviewing the sprint progress this morning, I'm pleased to report that we're about 85% complete with all assigned tasks. The development team has made excellent progress on the API integration issues we were facing last week.\n\nThe main blockers were resolved yesterday. Sarah from the QA team helped identify a critical path issue in the authentication flow, which Alex was able to fix within hours. We've also completed the performance optimization tasks that were flagged as high priority. Barring any unforeseen complications, we should be ready for the demo next Tuesday as planned."
    },
    {
        "index": 10,
        "date": "2025-05-03T05:56:14.290Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "🏃‍♀️ Quick update on deliverables",
        "body": "We're tracking well against the deadline. After reviewing the sprint progress this morning, I'm pleased to report that we're about 85% complete with all assigned tasks. The development team has made excellent progress on the API integration issues we were facing last week.\n\nThe main blockers were resolved yesterday. Sarah from the QA team helped identify a critical path issue in the authentication flow, which Alex was able to fix within hours. We've also completed the performance optimization tasks that were flagged as high priority. Barring any unforeseen complications, we should be ready for the demo next Tuesday as planned."
    },
    {
        "index": 11,
        "date": "2025-05-02T10:19:52.376Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "✉️ Team planning meeting invite",
        "body": "Please RSVP to the planning meeting scheduled for Friday at 10AM. This will be an important strategy session where we'll be mapping out our objectives for the next quarter and assigning key responsibilities across teams.\n\n\nAgenda is attached. We'll be covering the following major topics:\n1. Review of Q1 performance metrics and KPIs\n2. Discussion of upcoming product feature prioritization\n3. Resource allocation for the new marketing initiative\n4. Team structure adjustments to better support our growing client base\n\nPlease come prepared with any relevant data or insights from your department. The meeting is expected to run for approximately 90 minutes."
    },
    {
        "index": 12,
        "date": "2025-05-02T10:19:52.376Z",
        "deleted": true,
        "encrypted": false,
        "folder": "trash",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "✉️ Team planning meeting invite",
        "body": "Please RSVP to the planning meeting scheduled for Friday at 10AM. This will be an important strategy session where we'll be mapping out our objectives for the next quarter and assigning key responsibilities across teams.\n\n\nAgenda is attached. We'll be covering the following major topics:\n1. Review of Q1 performance metrics and KPIs\n2. Discussion of upcoming product feature prioritization\n3. Resource allocation for the new marketing initiative\n4. Team structure adjustments to better support our growing client base\n\nPlease come prepared with any relevant data or insights from your department. The meeting is expected to run for approximately 90 minutes."
    },
    {
        "index": 13,
        "date": "2025-05-01T07:38:19.925Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "demo@kagi.com",
        "subject": "💾 Outdated proposal draft",
        "body": "This version is outdated. I apologize for any confusion this might cause, but I've just received significant feedback from the client that will substantially change our approach to the proposal. The financial projections and scope of work sections particularly need major revisions based on their updated requirements.\n\n\nPlease disregard and wait for the final revision tomorrow. I'm working with the finance team to recalculate the budget allocations and with the technical team to adjust the implementation timeline. The new document will include expanded sections on risk management and a more detailed breakdown of the phased deployment strategy that better aligns with the client's fiscal year planning."
    },
    {
        "index": 14,
        "date": "2025-05-01T07:38:19.925Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "💾 Outdated proposal draft",
        "body": "This version is outdated. I apologize for any confusion this might cause, but I've just received significant feedback from the client that will substantially change our approach to the proposal. The financial projections and scope of work sections particularly need major revisions based on their updated requirements.\n\n\nPlease disregard and wait for the final revision tomorrow. I'm working with the finance team to recalculate the budget allocations and with the technical team to adjust the implementation timeline. The new document will include expanded sections on risk management and a more detailed breakdown of the phased deployment strategy that better aligns with the client's fiscal year planning."
    },
    {
        "index": 15,
        "date": "2025-04-30T16:28:43.189Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "🥗 Lunch schedule for Friday",
        "body": "Just a heads up — we're doing team lunch at noon on Friday at the new Thai place. It's called Bangkok Garden and has received fantastic reviews since opening last month. I've already made a reservation for our group of 12.\n\nThis will be a great opportunity to celebrate the successful product launch and welcome the two new team members who started this week. The restaurant offers plenty of vegetarian and gluten-free options, so everyone should find something they enjoy. I've heard their pad thai and green curry are particularly excellent. Let me know if you have any dietary restrictions I should pass along to the restaurant before our visit."
    },
    {
        "index": 16,
        "date": "2025-04-30T16:28:43.189Z",
        "deleted": true,
        "encrypted": false,
        "folder": "trash",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "🥗 Lunch schedule for Friday",
        "body": "Just a heads up — we're doing team lunch at noon on Friday at the new Thai place. It's called Bangkok Garden and has received fantastic reviews since opening last month. I've already made a reservation for our group of 12.\n\nThis will be a great opportunity to celebrate the successful product launch and welcome the two new team members who started this week. The restaurant offers plenty of vegetarian and gluten-free options, so everyone should find something they enjoy. I've heard their pad thai and green curry are particularly excellent. Let me know if you have any dietary restrictions I should pass along to the restaurant before our visit."
    },
    {
        "index": 17,
        "date": "2025-04-29T23:17:04.501Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "demo@kagi.com",
        "subject": "🔁 Follow-up on last sprint",
        "body": "Here's a summary of the last sprint and open items to be carried forward. Overall, we completed 87% of our story points, which is an improvement from the previous sprint's 72% completion rate. The team did exceptionally well with the backend optimizations, reducing database query times by almost 40%.\n\n\nHowever, we still have several critical items that need to be addressed in the upcoming sprint:\n1. The user authentication edge cases identified during testing\n2. Responsive design issues on tablet devices\n3. Performance bottlenecks in the reporting module\n\nLet's discuss next steps. I believe we should prioritize the authentication issues first, as they present potential security concerns. I'd also like to talk about possibly bringing in additional QA resources to help clear the testing backlog that's starting to accumulate."
    },
    {
        "index": 18,
        "date": "2025-04-29T23:17:04.501Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "🔁 Follow-up on last sprint",
        "body": "Here's a summary of the last sprint and open items to be carried forward. Overall, we completed 87% of our story points, which is an improvement from the previous sprint's 72% completion rate. The team did exceptionally well with the backend optimizations, reducing database query times by almost 40%.\n\n\nHowever, we still have several critical items that need to be addressed in the upcoming sprint:\n1. The user authentication edge cases identified during testing\n2. Responsive design issues on tablet devices\n3. Performance bottlenecks in the reporting module\n\nLet's discuss next steps. I believe we should prioritize the authentication issues first, as they present potential security concerns. I'd also like to talk about possibly bringing in additional QA resources to help clear the testing backlog that's starting to accumulate."
    },
    {
        "index": 19,
        "date": "2025-04-28T08:55:16.723Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "✨ New onboarding checklist",
        "body": "We've updated the onboarding steps for new hires. The revised process now includes a more comprehensive introduction to our tech stack, additional training sessions for our proprietary tools, and a structured mentorship program for the first 30 days.\n\nThe HR team has also developed improved documentation covering company policies, benefits enrollment, and team-specific workflows. New hires will now have a scheduled check-in at the end of weeks 1, 2, and 4 to ensure they're adjusting well and have all necessary resources.\n\n\nPlease review and share with any new team members. Your feedback on these changes would be valuable, especially if you notice any gaps based on your own onboarding experience. We're always looking to refine the process to help new team members integrate more smoothly and become productive more quickly."
    },
    {
        "index": 20,
        "date": "2025-04-28T08:55:16.723Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "✨ New onboarding checklist",
        "body": "We've updated the onboarding steps for new hires. The revised process now includes a more comprehensive introduction to our tech stack, additional training sessions for our proprietary tools, and a structured mentorship program for the first 30 days.\n\nThe HR team has also developed improved documentation covering company policies, benefits enrollment, and team-specific workflows. New hires will now have a scheduled check-in at the end of weeks 1, 2, and 4 to ensure they're adjusting well and have all necessary resources.\n\n\nPlease review and share with any new team members. Your feedback on these changes would be valuable, especially if you notice any gaps based on your own onboarding experience. We're always looking to refine the process to help new team members integrate more smoothly and become productive more quickly."
    },
    {
        "index": 21,
        "date": "2025-04-27T17:22:49.309Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "📍 Reminder to update slide deck",
        "body": "Don't forget to replace the Q1 revenue slide before tomorrow's presentation. The numbers we initially included were from the preliminary report, but finance has since finalized the calculations and there are some significant changes we need to incorporate.\n\n\nThe updated figures show a 12% increase in subscription revenue compared to our initial estimate of 8%, and the customer acquisition cost has decreased by nearly 15%. These improvements will substantially affect our projected annual growth rate and break-even timeline.\n\nI've placed the new data in our shared folder, along with some additional graphs that might be helpful for visualizing the trend. The executive team will be particularly interested in these positive developments, so we should highlight them prominently in the deck."
    },
    {
        "index": 22,
        "date": "2025-04-27T17:22:49.309Z",
        "deleted": true,
        "encrypted": false,
        "folder": "trash",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "📍 Reminder to update slide deck",
        "body": "Don't forget to replace the Q1 revenue slide before tomorrow's presentation. The numbers we initially included were from the preliminary report, but finance has since finalized the calculations and there are some significant changes we need to incorporate.\n\n\nThe updated figures show a 12% increase in subscription revenue compared to our initial estimate of 8%, and the customer acquisition cost has decreased by nearly 15%. These improvements will substantially affect our projected annual growth rate and break-even timeline.\n\nI've placed the new data in our shared folder, along with some additional graphs that might be helpful for visualizing the trend. The executive team will be particularly interested in these positive developments, so we should highlight them prominently in the deck."
    },
    {
        "index": 23,
        "date": "2025-04-26T06:14:58.431Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "test@test.com",
        "owner": "test@test.com",
        "to": "demo@kagi.com",
        "subject": "💡 Old idea notes",
        "body": "Capture of that app idea I had last month about the augmented reality shopping assistant. I've been doing some additional research, and while the core concept still seems innovative, the technical implementation would be more complex than I initially thought.\n\n\nThe main challenges would be:\n1. Accurately identifying products in varied lighting conditions\n2. Maintaining an updated database of product information across retailers\n3. Developing algorithms that can provide genuinely personalized recommendations\n\nProbably not useful anymore, but keeping for reference. If we ever pivot more toward consumer retail tech, some elements of this concept might be worth revisiting, particularly the visual search component. The market analysis I did also revealed some interesting insights about shopping behavior that could inform our current product decisions."
    },
    {
        "index": 24,
        "date": "2025-04-26T06:14:58.431Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "test@test.com",
        "owner": "demo@kagi.com",
        "to": "demo@kagi.com",
        "subject": "💡 Old idea notes",
        "body": "Capture of that app idea I had last month about the augmented reality shopping assistant. I've been doing some additional research, and while the core concept still seems innovative, the technical implementation would be more complex than I initially thought.\n\n\nThe main challenges would be:\n1. Accurately identifying products in varied lighting conditions\n2. Maintaining an updated database of product information across retailers\n3. Developing algorithms that can provide genuinely personalized recommendations\n\nProbably not useful anymore, but keeping for reference. If we ever pivot more toward consumer retail tech, some elements of this concept might be worth revisiting, particularly the visual search component. The market analysis I did also revealed some interesting insights about shopping behavior that could inform our current product decisions."
    },
    {
        "index": 25,
        "date": "2025-04-25T13:06:35.713Z",
        "deleted": false,
        "encrypted": false,
        "folder": "sent",
        "from": "demo@kagi.com",
        "owner": "demo@kagi.com",
        "to": "test@test.com",
        "subject": "🛍️ Grocery list draft",
        "body": "Milk, eggs, spinach, peanut butter, coffee filters, and bananas. Also need to pick up some whole grain bread, chicken breasts for meal prep this weekend, and that special Italian olive oil that's on sale this week. The pantry is also running low on quinoa and canned tomatoes.\n\n\nFor non-food items, we're almost out of laundry detergent and dishwasher pods. Don't forget to check if they have those paper towels we like - the ones with the half-sheet option. Oh, and we should probably grab some more of that jasmine tea that everyone in the office seems to love. Last time I checked, we were down to just two bags left in the communal kitchen."
    },
    {
        "index": 26,
        "date": "2025-04-25T13:06:35.713Z",
        "deleted": false,
        "encrypted": false,
        "folder": "inbox",
        "from": "demo@kagi.com",
        "owner": "test@test.com",
        "to": "test@test.com",
        "subject": "🛍️ Grocery list draft",
        "body": "Milk, eggs, spinach, peanut butter, coffee filters, and bananas. Also need to pick up some whole grain bread, chicken breasts for meal prep this weekend, and that special Italian olive oil that's on sale this week. The pantry is also running low on quinoa and canned tomatoes.\n\n\nFor non-food items, we're almost out of laundry detergent and dishwasher pods. Don't forget to check if they have those paper towels we like - the ones with the half-sheet option. Oh, and we should probably grab some more of that jasmine tea that everyone in the office seems to love. Last time I checked, we were down to just two bags left in the communal kitchen."
    }
      
];


async function seedFirestore() {
    try {
        for (const email of seedData) {
            const emailRef = doc(db, "emails", email.index.toString());
            await setDoc(emailRef, email);     }
            console.log("Firestore seeding complete.");
        } catch (err) {
            console.log("Error seeding Firestore:", err);
        }
}

seedFirestore();