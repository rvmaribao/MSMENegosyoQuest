// A separate application-focused assessment, one scenario per competency.
export const postTestQuestions = [
  {
    id: 1, category: 'AI Basics',
    question: 'Liza runs a bakery. An AI-generated product description says her ordinary pandesal is gluten-free. What should she do before publishing?',
    options: ['Publish it; AI sounds very confident.', 'Add more emojis to distract readers.', 'Verify the ingredients and remove the unsupported claim.', 'Raise the price because it now sounds premium.'],
    correctAnswer: 2,
    explanation: 'AI can invent details. Check factual claims against your actual product before customers rely on them.',
    negosyoTip: 'Confidence is not an ingredient. Verify muna.'
  },
  {
    id: 2, category: 'Prompting',
    question: 'Jun needs a short SMS announcing his laundry shop’s weekday pickup promo. Which prompt gives AI enough direction to produce a usable draft?',
    options: ['Write a friendly Filipino SMS under 160 characters for nearby office workers: free pickup Monday–Thursday, minimum 5 kg, booking by text. Do not invent a phone number.', 'Make our laundry legendary.', 'Copy the longest competitor ad you can find.', 'Write everything you know about washing clothes.'],
    correctAnswer: 0,
    explanation: 'A useful prompt specifies the audience, channel, length, offer, tone, and factual limits.',
    negosyoTip: 'A clear brief saves you from a novel-sized SMS.'
  },
  {
    id: 3, category: 'Digital Marketing',
    question: 'A local coffee seller tests two posts with the same budget. Post A earns 600 likes and 2 orders. Post B earns 90 likes and 15 orders. The goal is sales. What is the best next step?',
    options: ['Choose A because likes pay the electric bill.', 'Delete both posts and stop measuring.', 'Declare B guaranteed to work forever.', 'Check cost per order and profit, then test more content like B.'],
    correctAnswer: 3,
    explanation: 'Measure outcomes related to the goal. Orders, acquisition cost, and margin are more useful than likes alone when evaluating sales campaigns.'
  },
  {
    id: 4, category: 'Customer Service',
    question: 'An AI reply promises a refund within one hour, but your shop policy requires checking the returned item first. A customer is waiting. What should you send?',
    options: ['The AI reply, then hope accounting performs a miracle.', 'A reviewed reply acknowledging the problem, explaining the actual return process, and offering a realistic update time.', 'A message blaming the customer for trusting your shop.', 'No reply until the customer forgets.'],
    correctAnswer: 1,
    explanation: 'Empathy must be paired with accurate commitments. Review AI drafts against your actual policies and ability to deliver.'
  },
  {
    id: 5, category: 'Sales & Data',
    question: 'Rico’s sales sheet shows a sudden threefold jump. Before using an AI summary to plan purchases, he notices the same receipts were imported twice. What should happen first?',
    options: ['Order triple the stock immediately.', 'Post “record-breaking sales” before anyone checks.', 'Remove duplicate records, verify totals, and rerun the analysis.', 'Ask AI to ignore anything inconvenient.'],
    correctAnswer: 2,
    explanation: 'Reliable decisions need accurate input. Clean duplicates and validate totals before interpreting trends or forecasts.'
  },
  {
    id: 6, category: 'Inventory',
    question: 'A sari-sari store sells about 8 packs of coffee daily. Delivery takes 3 days, and the owner keeps 6 packs as a safety buffer. At roughly what stock level should a reorder be triggered?',
    options: ['30 packs: 8 × 3 days, plus 6 buffer packs.', '6 packs, regardless of delivery time.', '0 packs. Surprise stockout sale!', '300 packs for every product, no questions asked.'],
    correctAnswer: 0,
    explanation: 'A basic reorder point covers expected demand during delivery lead time plus safety stock: (8 × 3) + 6 = 30 packs. Adjust when demand or lead times change.'
  },
  {
    id: 7, category: 'Pricing & Profit',
    question: 'Maya sells 50 snack boxes at ₱100 each. Ingredients and packaging cost ₱60 per box, and delivery plus other operating costs total ₱500. What is the profit for this batch?',
    options: ['₱5,000 — all sales are pocket money.', '₱2,500.', '₱2,000, because operating costs are optional.', '₱1,500: ₱5,000 sales − ₱3,000 product costs − ₱500 operating costs.'],
    correctAnswer: 3,
    explanation: 'Profit accounts for both product costs and operating expenses. For this batch: 50 × (100 − 60) − 500 = ₱1,500.'
  },
  {
    id: 8, category: 'Digital Presence',
    question: 'Customers keep messaging “Saan po kayo?” and arriving when a repair shop is closed. Which update will most directly reduce that friction?',
    options: ['Change the logo every week.', 'Publish accurate hours, a map pin, contact details, services, and a clear booking step on the shop’s profiles.', 'Buy followers from another country.', 'Replace service information with motivational quotes.'],
    correctAnswer: 1,
    explanation: 'An effective digital presence helps customers take action. Accurate location, hours, services, and contact information remove common barriers.'
  },
  {
    id: 9, category: 'AI Safety',
    question: 'A shop owner wants AI to identify common complaint themes. The spreadsheet includes names, phone numbers, addresses, and order notes. What is the safest useful approach?',
    options: ['Upload the entire file because analysis needs every secret.', 'Paste customer passwords too, for extra context.', 'Remove identifiers and sensitive details, use only the minimum necessary anonymized complaint text, and follow the business’s approved tool policy.', 'Make the spreadsheet public so AI can find it.'],
    correctAnswer: 2,
    explanation: 'Minimize and anonymize information before using an approved tool. Check free-text notes too: they can contain identifying or sensitive details.'
  },
  {
    id: 10, category: 'Business Growth',
    question: 'Ana can spend only two hours a week experimenting with AI in her tailoring shop. Which first project gives her a practical way to judge its value?',
    options: ['Pilot AI-assisted quote drafts for two weeks, review each draft, and compare time saved and errors with her current process.', 'Replace every workflow on Monday morning.', 'Buy every subscription before choosing a problem.', 'Let AI set the business strategy without checking customer needs.'],
    correctAnswer: 0,
    explanation: 'Start with a focused, measurable pilot. Compare benefits and mistakes, retain human review, and expand only when results justify it.',
    negosyoTip: 'Small experiment, useful evidence. Hindi subscription collection.'
  }
];
