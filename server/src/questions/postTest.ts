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
    id: 5, category: 'Prompting',
    question: 'A Cebuano tablea maker wants AI to draft a product description for online buyers. Which prompt gives the clearest useful brief?',
    options: ['Make tablea famous.', 'Write anything about chocolate.', 'Write a warm 70-word product description for our locally made tablea for first-time online buyers. Mention its real ingredients, suggest one serving use, use simple Filipino-English, and do not invent health claims.', 'Promise that our tablea cures every problem.'],
    correctAnswer: 2,
    explanation: 'A practical prompt gives AI a product, audience, format, factual limits, and intended tone.'
  },
  {
    id: 6, category: 'Digital Marketing',
    question: 'A neighborhood café wants to promote a new merienda bundle without spending all day online. Which AI-assisted campaign approach should it try first?',
    options: ['Ask AI for three audience-specific caption ideas and a simple one-week posting plan, then check the menu, price, and photos before posting.', 'Ask AI to promise free delivery anywhere even though the café has no delivery service.', 'Use only a copied competitor post with the café name replaced.', 'Post every draft instantly without checking whether the bundle is available.'],
    correctAnswer: 0,
    explanation: 'AI can create options quickly, but a small focused campaign still needs real offers, accurate details, and owner review.'
  },
  {
    id: 7, category: 'Sales & Inventory Data',
    question: 'A small producer has monthly sales, current stock, and delivery dates in a spreadsheet. What is the most useful AI analysis request before the next buying decision?',
    options: ['Summarize fast- and slow-moving items, flag low-stock products, and show unusual sales changes for the owner to verify.', 'Predict exact sales for the next five years with no uncertainty.', 'Delete slow-selling products from the records before analysis.', 'Replace the supplier agreement with an AI guess.'],
    correctAnswer: 0,
    explanation: 'AI can help surface patterns in clean business data, but people must verify records and make the final buying decision.'
  },
  {
    id: 8, category: 'AI Toolbox',
    question: 'An online seller receives the same delivery and size questions every day. Which AI capability best matches the problem?',
    options: ['Draft a set of polite FAQ replies using the seller’s real delivery and sizing policy, then have the owner review them.', 'Make up delivery times for every customer.', 'Upload customer payment details to get faster answers.', 'Block every customer who asks a question.'],
    correctAnswer: 0,
    explanation: 'AI can draft repeatable customer-service replies, but the business must supply accurate policies and review every message.'
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
    question: 'A tailoring shop has late replies, unsold fabric, and little time to plan promotions. Which AI-assisted mission gives the owner the safest practical next step?',
    options: ['Use an anonymized summary of inquiries, sales, and fabric stock; ask AI for reply and promotion ideas; review the suggestions and test a small pilot.', 'Give AI customer passwords and let it set all prices without checking.', 'Use AI output as final policy even when it conflicts with the shop’s real capacity.', 'Buy every AI subscription before deciding which business problem matters.'],
    correctAnswer: 0,
    explanation: 'A strong AI workflow connects a real business problem to useful data and a focused request, then keeps human review in the final decision.',
    negosyoTip: 'Small experiment, useful evidence. Hindi subscription collection.'
  }
];
