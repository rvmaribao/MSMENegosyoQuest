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
  },
  {
    id: 11, category: 'AI Basics',
    question: 'A Bohol souvenir shop uses software that spots common customer questions and suggests replies. What makes this an example of AI?',
    options: ['It only provides internet access.', 'It uses patterns in information to perform a task that normally needs human intelligence.', 'It can only be used to write computer code.', 'It replaces every worker in the shop.'],
    correctAnswer: 1,
    explanation: 'AI can recognize patterns and support tasks such as drafting replies; it does not automatically replace people.'
  },
  {
    id: 12, category: 'AI in the Negosyo',
    question: 'Which tool would be an AI option for a Quezon City online seller handling repeated delivery questions?',
    options: ['A chatbot trained on the seller’s reviewed delivery FAQ.', 'A basic four-function calculator.', 'A blank USB drive.', 'A handwritten duplicate receipt pad.'],
    correctAnswer: 0,
    explanation: 'A chatbot can use AI to help answer recurring questions, while the other tools do not provide AI assistance.'
  },
  {
    id: 13, category: 'Productivity',
    question: 'A Davao dried-fruit producer spends each Friday sorting similar customer requests. What is the most realistic AI productivity use?',
    options: ['Let AI operate the business with no owner review.', 'Ask AI to group recurring requests and draft responses for the owner to check.', 'Remove all staff because AI is available.', 'Promise that AI will double sales next week.'],
    correctAnswer: 1,
    explanation: 'AI can reduce repetitive work by organizing information and drafting material for the owner to review.'
  },
  {
    id: 14, category: 'Social Media',
    question: 'A Pampanga bakery has thirty minutes to promote a weekend ensaymada bundle. How can AI help responsibly?',
    options: ['Draft several caption ideas and post formats for the owner to verify.', 'Guarantee the post will go viral.', 'Make every viewer place an order.', 'Run the bakery without the owner.'],
    correctAnswer: 0,
    explanation: 'AI can speed up ideation and drafting, while real prices, availability, and claims still need owner review.'
  },
  {
    id: 15, category: 'AI Business Activities',
    question: 'A Cebu repair shop wants help with promotions, customer questions, and a monthly sales summary. Which statement is accurate?',
    options: ['AI can assist with only promotions.', 'AI can assist with only customer questions.', 'AI can assist with only sales summaries.', 'AI can potentially assist with all three activities.'],
    correctAnswer: 3,
    explanation: 'AI may assist across marketing, customer service, and data analysis when used with appropriate review.'
  },
  {
    id: 16, category: 'Customer Feedback',
    question: 'AI summarizes comments from a Batangas resort and says guests dislike breakfast. Before changing the menu, what should the owner do?',
    options: ['Treat the summary as final proof.', 'Review the original comments and verify the AI summary.', 'Delete all guest comments.', 'Let AI make the menu decision alone.'],
    correctAnswer: 1,
    explanation: 'The owner should verify the analysis against the source feedback before making a business decision.'
  },
  {
    id: 17, category: 'Prompting',
    question: 'A Marikina shoe maker asks AI to “write something.” The result is not useful. What improvement is most likely to help?',
    options: ['Make the prompt longer without adding details.', 'State the product, audience, goal, tone, and needed output.', 'Avoid short prompts because AI cannot read them.', 'Assume a clear prompt guarantees a correct answer.'],
    correctAnswer: 1,
    explanation: 'Specific context and constraints make AI output more relevant, though it still needs checking.'
  },
  {
    id: 18, category: 'Competitor Information',
    question: 'AI says a nearby laundry shop changed its prices. What should a local laundry owner do before reacting?',
    options: ['Assume AI is accurate.', 'Check the competitor’s official channels or other reliable sources.', 'Publish the claim immediately.', 'Use the claim without checking where it came from.'],
    correctAnswer: 1,
    explanation: 'Business decisions should rely on verified information from reliable sources.'
  },
  {
    id: 19, category: 'Over-reliance on AI',
    question: 'A store owner accepts every AI pricing suggestion without reviewing costs or local demand. What is the main risk?',
    options: ['The owner may lose human judgment and become overly dependent on AI.', 'The store automatically becomes profitable.', 'Employees stop making every mistake.', 'Customers always prefer the store.'],
    correctAnswer: 0,
    explanation: 'AI suggestions need human judgment, especially when local costs and customer needs affect decisions.'
  },
  {
    id: 20, category: 'AI Content',
    question: 'An AI writes a product description for a Laguna furniture maker. Which publishing practice is true?',
    options: ['AI descriptions are always accurate.', 'AI descriptions never contain errors.', 'The owner should review and fact-check the description before publishing.', 'AI descriptions need no human supervision.'],
    correctAnswer: 2,
    explanation: 'AI-generated material can be inaccurate, so factual claims require human review before publication.'
  },
  {
    id: 21, category: 'Customer Database',
    question: 'A Iloilo catering business wants AI to summarize repeat orders from its customer list. What should it consider first?',
    options: ['Data privacy and whether uploading the information is appropriate.', 'Whether the tool has bright colors.', 'Whether it can write social captions.', 'Whether it replies instantly.'],
    correctAnswer: 0,
    explanation: 'Customer information needs privacy review and appropriate handling before it is shared with an AI tool.'
  },
  {
    id: 22, category: 'Human Review',
    question: 'An unchecked AI draft changes a Philippine shop’s “10% discount” to “100% discount.” What does this show?',
    options: ['AI errors can go unnoticed and affect business decisions without human review.', 'AI automatically fixes all mistakes.', 'The business will always save money.', 'Customers automatically trust the business more.'],
    correctAnswer: 0,
    explanation: 'Human review catches errors before inaccurate output affects customers or business operations.'
  },
  {
    id: 23, category: 'Best Approach',
    question: 'A General Santos fish seller is trying AI for demand summaries. Which approach is best?',
    options: ['Let AI handle every decision.', 'Avoid AI completely.', 'Use AI as an assistant while the owner checks data and makes the final decision.', 'Use AI only for entertainment.'],
    correctAnswer: 2,
    explanation: 'AI works best as a tool that supports, rather than replaces, human business judgment.'
  },
  {
    id: 24, category: 'False Product Feature',
    question: 'AI creates a poster saying a Cagayan de Oro café offers free refills, but it does not. What should happen before posting?',
    options: ['Publish it because AI made it.', 'Correct the false claim before publishing.', 'Ask customers whether it is correct.', 'Ignore the error.'],
    correctAnswer: 1,
    explanation: 'The owner must remove or correct false promotional claims before customers see them.'
  },
  {
    id: 25, category: 'Responsible AI',
    question: 'Which plan best describes responsible AI use for a Philippine MSME?',
    options: ['Use AI to replace human decisions whenever possible.', 'Use AI strategically for productivity while checking accuracy, privacy, ethics, and human judgment.', 'Use AI only when a business is already large.', 'Publish AI information without verifying it.'],
    correctAnswer: 1,
    explanation: 'Responsible AI use combines useful assistance with accuracy checks, privacy protection, ethical thinking, and human judgment.'
  }
];
