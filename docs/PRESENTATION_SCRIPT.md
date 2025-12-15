# Presentation Script: Heroku + Expanso Demo

**Duration**: 15-20 minutes
**Audience**: Heroku/Salesforce teams, Expanso stakeholders, enterprise customers
**Goal**: Demonstrate how Expanso + Heroku solve the "ingest gap" between edge data and Salesforce

---

## Pre-Presentation Checklist

- [ ] Demo running locally or deployed to GitHub Pages
- [ ] Browser in full-screen or presentation mode
- [ ] Dark mode toggled to match room lighting
- [ ] Screen sharing configured (if remote)

---

## Opening (2 minutes)

### The Hook

> "Let me ask you a question: How do you get data from a camera on a street corner... into a Salesforce ticket that dispatches a field technician?
>
> Today, that's a nightmare of custom integrations, expensive cloud storage, and brittle pipelines.
>
> We're going to show you a better way."

### Scroll to Hero Section

> "This is the 'Real-World to Record' pipeline—a seamless architecture where **Expanso** handles the edge, **Heroku** handles the logic, and **Salesforce** handles the action.
>
> Let me show you what this looks like in practice."

---

## Section 1: The Scenarios (2 minutes)

### Scroll to Scenario Cards

> "We've built two real-world scenarios that demonstrate this architecture. Both are problems we hear from enterprise customers constantly."

**Point to Smart City card:**

> "First, the **Smart City Traffic Monitor**. Cities want to count foot traffic, but they can't stream terabytes of video to the cloud. Privacy laws, bandwidth costs, storage fees—it doesn't work."

**Point to Utility card:**

> "Second, the **Proactive Utility Service**. Utilities have millions of smart meters sending 25,000 data points per second. They want to fix outages before customers call. But how do you correlate that firehose of data with customer records in Salesforce?"

> "Let's start with the Smart City scenario."

**Click on Smart City card**

---

## Section 2: Smart City Deep Dive (5-6 minutes)

### The Problem

> "Here's the challenge."

**Point to the red Problem box:**

> "The City of Bellevue has cameras at intersections. They need to know: how many people walk through here every hour? Simple question. But to answer it traditionally, you'd need to stream HD video to the cloud, store it, process it, and hope you don't violate GDPR in the process.
>
> The math doesn't work. 1080p video at 30fps is about 50 megabits per second. That's terabytes per day, per camera."

### Architecture Walkthrough

> "Watch how we solve this."

**Point to the Architecture Diagram. Let the animation run.**

> "See those data packets flowing? Let me explain what's happening at each step."

**Click on the Camera component:**

> "We start with a standard IP camera. Nothing special—existing infrastructure. This is important because cities already have cameras everywhere."

**Click on Expanso Agent:**

> "Here's where the magic happens. This is an **Expanso agent** running on a $50 Raspberry Pi. It pulls the video stream, runs a person detection model locally, and counts heads.
>
> But here's the key: **it throws away the video**. The footage never leaves the device. Only a tiny JSON packet—timestamp and count—goes to the cloud."

**Point to the Data Flow Indicator at bottom:**

> "Look at that transformation. 30fps video stream in... JSON packet out. We go from 50 megabits per second to about 10 bytes per minute."

**Click on Heroku Postgres:**

> "The counts land in **Heroku Postgres**. We're using time-series optimized tables with materialized views for hourly aggregates. Standard stuff, but it just works."

**Click on Dashboard:**

> "And finally, we visualize it. Real-time charts, heatmaps, trend analysis. City planners can see exactly where foot traffic is highest and when."

### See It In Action

**Click the "See It In Action" tab if not already selected**

> "Let me show you what the outcome looks like."

**Point to the live chart updating:**

> "This is a simulated dashboard. In production, you'd see real counts coming in from cameras across the city. Watch the bars update—that's new data arriving."

**Point to the Data Reduction Impact card:**

> "This is my favorite part. Look at these numbers:
> - Raw video data: **432 GB per day**
> - Actual data sent: **2.4 MB per day**
> - That's a **99.9994% reduction**
>
> And zero privacy concerns. No video ever leaves the edge."

### Setup Guide (Optional - if audience is technical)

**Click the "Setup Guide" tab**

> "For the engineers in the room—this isn't vaporware. Let me show you the actual configuration."

**Click through Expanso, Heroku, Dashboard tabs:**

> "Here's the Expanso pipeline config... the Heroku setup with Postgres... the database schema. This is real, deployable configuration."

---

## Section 3: Utility Service Deep Dive (5-6 minutes)

### Transition

> "Now let's look at something more complex—the **Proactive Utility Service**."

**Click on Utility card**

### The Problem

**Point to Problem box:**

> "Here's the scenario. You're a large energy utility. You have millions of smart meters sending voltage readings—25,000 metrics per second across your entire fleet.
>
> A customer's power goes out. Do you know about it? Maybe, if they call. But here's the real question: is it just David's house, or is it David's entire neighborhood?
>
> That distinction matters. One is a broken meter. The other is a downed transformer that affects hundreds of customers."

### Architecture Walkthrough

**Let animation run, then click through components:**

**Click Smart Meters:**

> "Data starts at the smart meters. Millions of them, reporting voltage, current, power factor."

**Click Expanso Gateway:**

> "The **Expanso Gateway** sits at the edge—in this case, on gateway devices at substations. It's doing three critical things:
> 1. Cleaning and standardizing the data
> 2. Enriching it with customer metadata
> 3. **Filtering noise**—only anomalies get sent to the cloud
>
> That 25,000 metrics per second? We're sending maybe 500 meaningful events."

**Click Anomaly Detector:**

> "On Heroku, we run an **Anomaly Detector**—a Python or Go app that does the correlation. When it sees a voltage drop, it asks: is this one meter, or is it a pattern across a circuit?"

**Click Heroku Connect:**

> "Here's where it gets powerful. **Heroku Connect** syncs that anomaly event to Salesforce. No custom integration code. No webhooks to maintain. Just bidirectional sync."

**Click Salesforce:**

> "In **Service Cloud**, that anomaly becomes a Case. Automatically created, automatically assigned to Field Operations, with full context about which assets are affected."

**Click Slack:**

> "And the team gets notified instantly in Slack. The field ops channel sees the alert before any customer has even noticed the lights flickering."

### Run the Simulation

**Click "See It In Action" tab**

> "Let me run the simulation so you can see this flow."

**Click "Run Simulation" button**

> "Watch each step light up..."

*As each step activates, narrate:*

> "Anomaly detected—voltage drop across 4 meters...
>
> Correlation analysis—the system determines this is a neighborhood outage, not individual failures...
>
> Heroku Connect syncs to Salesforce in 1.2 seconds...
>
> And here's the ticket."

**Point to the Salesforce ticket mock:**

> "Priority 1. Type: Neighborhood Outage. Queue: Field Operations. And look at the description—it has everything the technician needs. Which meters, what voltage, which circuit."

**Point to the Slack notification mock:**

> "And here's the Slack alert. The team knows immediately. They can click 'Assign to Me' right from Slack."

**Point to the Impact Summary:**

> "The result?
> - **8 minutes** from detection to dispatch
> - **Zero** customer calls
> - **99.9%** data reduction
>
> The truck is rolling before the customer picks up the phone."

---

## Section 4: Why This Matters (2 minutes)

**Scroll to Benefits Section**

> "Let me summarize why this architecture matters—for everyone involved."

**Point to each benefit card:**

> "**For Expanso**: This validates the 'System Agent' model. Expanso isn't just another data pipeline—it's intelligent edge processing that integrates with enterprise systems.
>
> **For Heroku**: This expands the demo portfolio beyond web apps. It's IoT, it's edge computing, it's Salesforce integration—all running on the platform you already know.
>
> **For Customers**: They get proactive service instead of reactive. Massive cost savings on bandwidth and storage. Privacy-first architecture. And no custom integration code to maintain."

---

## Closing (1 minute)

**Scroll back to top**

> "What you've seen today is a **fully interactive demo**—not slides, not mockups. This is a working prototype that shows exactly how the user experience would feel.
>
> The architecture is real. The configurations are real. The next step is connecting actual services.
>
> Questions?"

---

## Q&A Prep: Anticipated Questions

### "How much does the edge hardware cost?"

> "For Smart City, we're talking about a Raspberry Pi 4—about $50-75. For Utility, the Expanso Gateway runs on existing substation hardware. No new hardware purchases required."

### "What about security?"

> "Great question. In the Smart City scenario, no video ever leaves the device—that's privacy by design. For Utility, all data is encrypted in transit, and Heroku Connect uses OAuth for Salesforce authentication."

### "How does this compare to AWS IoT or Azure IoT Hub?"

> "Those are great platforms for cloud-first IoT. What makes this different is the **edge intelligence**. With Expanso, you're filtering 99%+ of data before it ever touches the cloud. That means lower costs, lower latency, and better privacy."

### "What's the latency for the utility scenario?"

> "From anomaly detection to Salesforce ticket: typically under 10 seconds. Heroku Connect can sync in near-real-time for high-priority events."

### "Can we see the actual Expanso/Heroku configuration?"

> "Absolutely. Click the 'Setup Guide' tab—all the configs are there. These are production-ready examples."

---

## Demo Recovery Tips

### If the animation stops working

> "Let me refresh the page—sometimes the browser needs a reset."

*Press F5 or Cmd+R*

### If someone asks about a feature that doesn't exist yet

> "That's a great idea for the next iteration. This demo is specifically scoped to show the core data flow—we deliberately kept it focused."

### If the build/deploy fails during live demo

> "We have a backup deployed at [GitHub Pages URL]. Let me switch to that."

---

## Post-Demo Follow-ups

After the presentation, share:

1. **GitHub Pages URL** for stakeholders to explore on their own
2. **This script** for anyone who wants to give the demo themselves
3. **Architecture diagrams** (screenshots from the demo work great)
4. **Next steps document** outlining what's needed to build the real thing
