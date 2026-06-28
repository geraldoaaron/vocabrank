import type { Question } from '@/types';

export const VOCABULARY: Question[] = [
  // ==================== DAILY CONVERSATION ====================
  // Easy
  { id: 'dc-e1', englishWord: 'accompany', indonesianTranslation: 'menemani', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'Can you accompany me to the store?', synonyms: ['escort', 'go with'], partOfSpeech: 'verb' },
  { id: 'dc-e2', englishWord: 'beautiful', indonesianTranslation: 'indah', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The sunset is beautiful today.', synonyms: ['gorgeous', 'stunning'], partOfSpeech: 'adjective' },
  { id: 'dc-e3', englishWord: 'delicious', indonesianTranslation: 'lezat', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'This food is delicious!', synonyms: ['tasty', 'yummy'], partOfSpeech: 'adjective' },
  { id: 'dc-e4', englishWord: 'friendly', indonesianTranslation: 'ramah', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The neighbors are very friendly.', synonyms: ['kind', 'welcoming'], partOfSpeech: 'adjective' },
  { id: 'dc-e5', englishWord: 'mistake', indonesianTranslation: 'kesalahan', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'Everyone makes mistakes.', synonyms: ['error', 'blunder'], partOfSpeech: 'noun' },
  { id: 'dc-e6', englishWord: 'quiet', indonesianTranslation: 'tenang', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The library is very quiet.', synonyms: ['silent', 'peaceful'], partOfSpeech: 'adjective' },
  { id: 'dc-e7', englishWord: 'understand', indonesianTranslation: 'memahami', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'I understand the instructions clearly.', synonyms: ['comprehend', 'grasp'], partOfSpeech: 'verb' },
  { id: 'dc-e8', englishWord: 'weather', indonesianTranslation: 'cuaca', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The weather is nice today.', synonyms: ['climate'], partOfSpeech: 'noun' },
  { id: 'dc-e9', englishWord: 'morning', indonesianTranslation: 'pagi', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'Good morning!', synonyms: ['dawn'], partOfSpeech: 'noun' },
  { id: 'dc-e10', englishWord: 'sleep', indonesianTranslation: 'tidur', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'I need to sleep early.', synonyms: ['rest', 'slumber'], partOfSpeech: 'verb' },
  { id: 'dc-e11', englishWord: 'happy', indonesianTranslation: 'senang', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'She looks very happy.', synonyms: ['joyful', 'glad'], partOfSpeech: 'adjective' },
  { id: 'dc-e12', englishWord: 'sad', indonesianTranslation: 'sedih', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'Why are you sad?', synonyms: ['unhappy', 'sorrowful'], partOfSpeech: 'adjective' },
  { id: 'dc-e13', englishWord: 'tired', indonesianTranslation: 'lelah', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'I am so tired after work.', synonyms: ['exhausted', 'weary'], partOfSpeech: 'adjective' },
  // Medium
  { id: 'dc-m1', englishWord: 'argue', indonesianTranslation: 'berdebat', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'They always argue about politics.', synonyms: ['debate', 'quarrel'], partOfSpeech: 'verb' },
  { id: 'dc-m2', englishWord: 'complain', indonesianTranslation: 'mengeluh', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'She likes to complain about everything.', synonyms: ['grumble', 'whine'], partOfSpeech: 'verb' },
  { id: 'dc-m3', englishWord: 'apologize', indonesianTranslation: 'meminta maaf', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'You should apologize to him.', synonyms: ['say sorry'], partOfSpeech: 'verb' },
  { id: 'dc-m4', englishWord: 'persuade', indonesianTranslation: 'membujuk', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'I tried to persuade her to come.', synonyms: ['convince'], partOfSpeech: 'verb' },
  { id: 'dc-m5', englishWord: 'convenient', indonesianTranslation: 'nyaman/praktis', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'This tool is very convenient.', synonyms: ['handy', 'useful'], partOfSpeech: 'adjective' },
  { id: 'dc-m6', englishWord: 'appreciate', indonesianTranslation: 'menghargai', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'I appreciate your help.', synonyms: ['value', 'thank'], partOfSpeech: 'verb' },
  { id: 'dc-m7', englishWord: 'stubborn', indonesianTranslation: 'keras kepala', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He is too stubborn to admit he is wrong.', synonyms: ['obstinate', 'headstrong'], partOfSpeech: 'adjective' },
  { id: 'dc-m8', englishWord: 'gossip', indonesianTranslation: 'bergosip', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'They love to gossip about celebrities.', synonyms: ['chatter', 'rumor'], partOfSpeech: 'verb' },
  { id: 'dc-m9', englishWord: 'curious', indonesianTranslation: 'penasaran', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'I am curious about the ending.', synonyms: ['inquisitive', 'nosy'], partOfSpeech: 'adjective' },
  { id: 'dc-m10', englishWord: 'awkward', indonesianTranslation: 'canggung', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'There was an awkward silence.', synonyms: ['uncomfortable', 'clumsy'], partOfSpeech: 'adjective' },
  // Hard
  { id: 'dc-h1', englishWord: 'eavesdrop', indonesianTranslation: 'menguping', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'It is rude to eavesdrop on private conversations.', synonyms: ['listen in', 'snoop'], partOfSpeech: 'verb' },
  { id: 'dc-h2', englishWord: 'procrastinate', indonesianTranslation: 'menunda-nunda', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'Stop procrastinating and do your homework.', synonyms: ['delay', 'stall'], partOfSpeech: 'verb' },
  { id: 'dc-h3', englishWord: 'hypocritical', indonesianTranslation: 'munafik', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'It is hypocritical to say one thing and do another.', synonyms: ['two-faced', 'insincere'], partOfSpeech: 'adjective' },
  { id: 'dc-h4', englishWord: 'exaggerate', indonesianTranslation: 'membesar-besarkan', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'Do not exaggerate the story.', synonyms: ['overstate', 'embellish'], partOfSpeech: 'verb' },
  { id: 'dc-h5', englishWord: 'gullible', indonesianTranslation: 'mudah ditipu', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'He is so gullible he believes anything.', synonyms: ['naive', 'credulous'], partOfSpeech: 'adjective' },
  { id: 'dc-h6', englishWord: 'spontaneous', indonesianTranslation: 'spontan', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'They took a spontaneous trip to the beach.', synonyms: ['unplanned', 'impulsive'], partOfSpeech: 'adjective' },
  { id: 'dc-h7', englishWord: 'sympathetic', indonesianTranslation: 'simpatik', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'She was very sympathetic to my problems.', synonyms: ['compassionate', 'understanding'], partOfSpeech: 'adjective' },
  { id: 'dc-h8', englishWord: 'fascinating', indonesianTranslation: 'sangat menarik', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'This book is absolutely fascinating.', synonyms: ['captivating', 'intriguing'], partOfSpeech: 'adjective' },
  { id: 'dc-h9', englishWord: 'overwhelmed', indonesianTranslation: 'kewalahan', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'I feel overwhelmed by all this work.', synonyms: ['swamped', 'burdened'], partOfSpeech: 'adjective' },
  { id: 'dc-h10', englishWord: 'reluctant', indonesianTranslation: 'enggan', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'He was reluctant to join the club.', synonyms: ['unwilling', 'hesitant'], partOfSpeech: 'adjective' },
  // Expert
  { id: 'dc-x1', englishWord: 'idiosyncrasy', indonesianTranslation: 'keunikan/kebiasaan aneh', difficulty: 'expert', category: 'Daily Conversation', exampleSentence: 'Everyone has their own idiosyncrasies.', synonyms: ['peculiarity', 'quirk'], partOfSpeech: 'noun' },
  { id: 'dc-x2', englishWord: 'ubiquitous', indonesianTranslation: 'ada di mana-mana', difficulty: 'expert', category: 'Daily Conversation', exampleSentence: 'Smartphones have become ubiquitous.', synonyms: ['omnipresent', 'pervasive'], partOfSpeech: 'adjective' },
  { id: 'dc-x3', englishWord: 'ephemeral', indonesianTranslation: 'fana/sementara', difficulty: 'expert', category: 'Daily Conversation', exampleSentence: 'Fame is often ephemeral.', synonyms: ['fleeting', 'short-lived'], partOfSpeech: 'adjective' },
  { id: 'dc-x4', englishWord: 'serendipity', indonesianTranslation: 'kebetulan yang menguntungkan', difficulty: 'expert', category: 'Daily Conversation', exampleSentence: 'Finding that old book was pure serendipity.', synonyms: ['fluke', 'luck'], partOfSpeech: 'noun' },
  { id: 'dc-x5', englishWord: 'mellifluous', indonesianTranslation: 'merdu', difficulty: 'expert', category: 'Daily Conversation', exampleSentence: 'She has a mellifluous voice.', synonyms: ['sweet-sounding', 'harmonious'], partOfSpeech: 'adjective' },

  // ==================== TOEFL ====================
  // Medium
  { id: 'tf-m1', englishWord: 'abundant', indonesianTranslation: 'berlimpah', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'The region has abundant natural resources.', synonyms: ['plentiful', 'ample'], partOfSpeech: 'adjective' },
  { id: 'tf-m2', englishWord: 'acquire', indonesianTranslation: 'memperoleh', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'She worked hard to acquire new skills.', synonyms: ['obtain', 'gain'], partOfSpeech: 'verb' },
  { id: 'tf-m3', englishWord: 'adequate', indonesianTranslation: 'memadai', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'The food supply was adequate for the winter.', synonyms: ['sufficient', 'enough'], partOfSpeech: 'adjective' },
  { id: 'tf-m4', englishWord: 'anticipate', indonesianTranslation: 'mengantisipasi', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'We anticipate a rise in demand.', synonyms: ['expect', 'foresee'], partOfSpeech: 'verb' },
  { id: 'tf-m5', englishWord: 'apparent', indonesianTranslation: 'jelas', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'The answer was apparent to everyone.', synonyms: ['obvious', 'evident'], partOfSpeech: 'adjective' },
  { id: 'tf-m6', englishWord: 'controversy', indonesianTranslation: 'kontroversi', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'The decision caused much controversy.', synonyms: ['debate', 'dispute'], partOfSpeech: 'noun' },
  { id: 'tf-m7', englishWord: 'convey', indonesianTranslation: 'menyampaikan', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'He tried to convey his feelings through art.', synonyms: ['communicate', 'express'], partOfSpeech: 'verb' },
  { id: 'tf-m8', englishWord: 'crucial', indonesianTranslation: 'sangat penting', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'Education is crucial for development.', synonyms: ['vital', 'essential'], partOfSpeech: 'adjective' },
  { id: 'tf-m9', englishWord: 'emphasize', indonesianTranslation: 'menekankan', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'I want to emphasize the importance of this.', synonyms: ['stress', 'highlight'], partOfSpeech: 'verb' },
  { id: 'tf-m10', englishWord: 'evaluate', indonesianTranslation: 'mengevaluasi', difficulty: 'medium', category: 'TOEFL', exampleSentence: 'We need to evaluate the results.', synonyms: ['assess', 'appraise'], partOfSpeech: 'verb' },
  // Hard
  { id: 'tf-h1', englishWord: 'compel', indonesianTranslation: 'memaksa', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'The evidence compelled him to confess.', synonyms: ['force', 'coerce'], partOfSpeech: 'verb' },
  { id: 'tf-h2', englishWord: 'comprise', indonesianTranslation: 'terdiri dari', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'The committee comprises five members.', synonyms: ['consist of', 'include'], partOfSpeech: 'verb' },
  { id: 'tf-h3', englishWord: 'concurrent', indonesianTranslation: 'bersamaan', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'The two events were concurrent.', synonyms: ['simultaneous', 'parallel'], partOfSpeech: 'adjective' },
  { id: 'tf-h4', englishWord: 'contemplate', indonesianTranslation: 'merenungkan', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'She contemplated her next move carefully.', synonyms: ['consider', 'ponder'], partOfSpeech: 'verb' },
  { id: 'tf-h5', englishWord: 'deteriorate', indonesianTranslation: 'memburuk', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'His health continued to deteriorate.', synonyms: ['decline', 'worsen'], partOfSpeech: 'verb' },
  { id: 'tf-h6', englishWord: 'diminish', indonesianTranslation: 'berkurang', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'The flood waters began to diminish.', synonyms: ['decrease', 'reduce'], partOfSpeech: 'verb' },
  { id: 'tf-h7', englishWord: 'elaborate', indonesianTranslation: 'menguraikan', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'Could you elaborate on your proposal?', synonyms: ['explain', 'expand'], partOfSpeech: 'verb' },
  { id: 'tf-h8', englishWord: 'endeavor', indonesianTranslation: 'usaha/berusaha', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'We must endeavor to improve our results.', synonyms: ['attempt', 'strive'], partOfSpeech: 'verb' },
  { id: 'tf-h9', englishWord: 'profound', indonesianTranslation: 'mendalam', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'The discovery had a profound impact.', synonyms: ['deep', 'significant'], partOfSpeech: 'adjective' },
  { id: 'tf-h10', englishWord: 'fluctuate', indonesianTranslation: 'berfluktuasi', difficulty: 'hard', category: 'TOEFL', exampleSentence: 'Prices fluctuate based on demand.', synonyms: ['vary', 'waver'], partOfSpeech: 'verb' },
  // Expert
  { id: 'tf-x1', englishWord: 'empirical', indonesianTranslation: 'empiris', difficulty: 'expert', category: 'TOEFL', exampleSentence: 'The theory is based on empirical evidence.', synonyms: ['experimental', 'observed'], partOfSpeech: 'adjective' },
  { id: 'tf-x2', englishWord: 'perpetual', indonesianTranslation: 'abadi', difficulty: 'expert', category: 'TOEFL', exampleSentence: 'They lived in a state of perpetual motion.', synonyms: ['eternal', 'constant'], partOfSpeech: 'adjective' },
  { id: 'tf-x3', englishWord: 'ambivalent', indonesianTranslation: 'bimbang', difficulty: 'expert', category: 'TOEFL', exampleSentence: 'She felt ambivalent about the new job.', synonyms: ['uncertain', 'undecided'], partOfSpeech: 'adjective' },
  { id: 'tf-x4', englishWord: 'anomalous', indonesianTranslation: 'menyimpang', difficulty: 'expert', category: 'TOEFL', exampleSentence: 'Researchers found anomalous data in the experiment.', synonyms: ['abnormal', 'atypical'], partOfSpeech: 'adjective' },
  { id: 'tf-x5', englishWord: 'pragmatic', indonesianTranslation: 'pragmatis', difficulty: 'expert', category: 'TOEFL', exampleSentence: 'We must take a pragmatic approach.', synonyms: ['practical', 'realistic'], partOfSpeech: 'adjective' },

  // ==================== IELTS ====================
  // Medium
  { id: 'ie-m1', englishWord: 'allocate', indonesianTranslation: 'mengalokasikan', difficulty: 'medium', category: 'IELTS', exampleSentence: 'The government will allocate funds for education.', synonyms: ['assign', 'distribute'], partOfSpeech: 'verb' },
  { id: 'ie-m2', englishWord: 'beneficial', indonesianTranslation: 'bermanfaat', difficulty: 'medium', category: 'IELTS', exampleSentence: 'Exercise is beneficial for health.', synonyms: ['advantageous', 'helpful'], partOfSpeech: 'adjective' },
  { id: 'ie-m3', englishWord: 'commence', indonesianTranslation: 'memulai', difficulty: 'medium', category: 'IELTS', exampleSentence: 'The ceremony will commence at noon.', synonyms: ['begin', 'start'], partOfSpeech: 'verb' },
  { id: 'ie-m4', englishWord: 'compatible', indonesianTranslation: 'kompatibel', difficulty: 'medium', category: 'IELTS', exampleSentence: 'The software is compatible with all devices.', synonyms: ['consistent', 'harmonious'], partOfSpeech: 'adjective' },
  { id: 'ie-m5', englishWord: 'compensate', indonesianTranslation: 'mengkompensasi', difficulty: 'medium', category: 'IELTS', exampleSentence: 'The company will compensate for any damages.', synonyms: ['reimburse', 'repay'], partOfSpeech: 'verb' },
  { id: 'ie-m6', englishWord: 'demonstrate', indonesianTranslation: 'mendemonstrasikan', difficulty: 'medium', category: 'IELTS', exampleSentence: 'The data demonstrate a clear trend.', synonyms: ['show', 'prove'], partOfSpeech: 'verb' },
  { id: 'ie-m7', englishWord: 'exaggerate', indonesianTranslation: 'membesar-besarkan', difficulty: 'medium', category: 'IELTS', exampleSentence: 'Do not exaggerate the importance of this event.', synonyms: ['overstate', 'inflate'], partOfSpeech: 'verb' },
  { id: 'ie-m8', englishWord: 'implement', indonesianTranslation: 'menerapkan', difficulty: 'medium', category: 'IELTS', exampleSentence: 'They plan to implement new rules.', synonyms: ['execute', 'apply'], partOfSpeech: 'verb' },
  { id: 'ie-m9', englishWord: 'justify', indonesianTranslation: 'membenarkan', difficulty: 'medium', category: 'IELTS', exampleSentence: 'You must justify your decision.', synonyms: ['defend', 'explain'], partOfSpeech: 'verb' },
  { id: 'ie-m10', englishWord: 'modify', indonesianTranslation: 'memodifikasi', difficulty: 'medium', category: 'IELTS', exampleSentence: 'We need to modify the current plan.', synonyms: ['alter', 'change'], partOfSpeech: 'verb' },
  // Hard
  { id: 'ie-h1', englishWord: 'ambiguous', indonesianTranslation: 'ambigu', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The statement was ambiguous and confusing.', synonyms: ['unclear', 'vague'], partOfSpeech: 'adjective' },
  { id: 'ie-h2', englishWord: 'coherent', indonesianTranslation: 'koheren', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The essay presented a coherent argument.', synonyms: ['logical', 'consistent'], partOfSpeech: 'adjective' },
  { id: 'ie-h3', englishWord: 'comprehensive', indonesianTranslation: 'komprehensif', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The report provides a comprehensive analysis.', synonyms: ['thorough', 'complete'], partOfSpeech: 'adjective' },
  { id: 'ie-h4', englishWord: 'consensus', indonesianTranslation: 'konsensus', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The committee reached a consensus.', synonyms: ['agreement', 'accord'], partOfSpeech: 'noun' },
  { id: 'ie-h5', englishWord: 'constraint', indonesianTranslation: 'kendala', difficulty: 'hard', category: 'IELTS', exampleSentence: 'Budget constraints limited the project scope.', synonyms: ['restriction', 'limitation'], partOfSpeech: 'noun' },
  { id: 'ie-h6', englishWord: 'displace', indonesianTranslation: 'menggantikan', difficulty: 'hard', category: 'IELTS', exampleSentence: 'Technology may displace traditional jobs.', synonyms: ['replace', 'supplant'], partOfSpeech: 'verb' },
  { id: 'ie-h7', englishWord: 'forthcoming', indonesianTranslation: 'yang akan datang', difficulty: 'hard', category: 'IELTS', exampleSentence: 'Details about forthcoming events will follow.', synonyms: ['upcoming', 'imminent'], partOfSpeech: 'adjective' },
  { id: 'ie-h8', englishWord: 'predominantly', indonesianTranslation: 'terutama', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The area is predominantly rural.', synonyms: ['mainly', 'primarily'], partOfSpeech: 'adverb' },
  { id: 'ie-h9', englishWord: 'vulnerability', indonesianTranslation: 'kerentanan', difficulty: 'hard', category: 'IELTS', exampleSentence: 'The system has several security vulnerabilities.', synonyms: ['weakness', 'susceptibility'], partOfSpeech: 'noun' },
  { id: 'ie-h10', englishWord: 'sustainable', indonesianTranslation: 'berkelanjutan', difficulty: 'hard', category: 'IELTS', exampleSentence: 'We need sustainable energy sources.', synonyms: ['renewable', 'viable'], partOfSpeech: 'adjective' },
  // Expert
  { id: 'ie-x1', englishWord: 'scrutinize', indonesianTranslation: 'meneliti', difficulty: 'expert', category: 'IELTS', exampleSentence: 'The auditors will scrutinize every transaction.', synonyms: ['examine', 'inspect'], partOfSpeech: 'verb' },
  { id: 'ie-x2', englishWord: 'substantiate', indonesianTranslation: 'membuktikan', difficulty: 'expert', category: 'IELTS', exampleSentence: 'You need evidence to substantiate your claim.', synonyms: ['verify', 'confirm'], partOfSpeech: 'verb' },
  { id: 'ie-x3', englishWord: 'unprecedented', indonesianTranslation: 'belum pernah terjadi sebelumnya', difficulty: 'expert', category: 'IELTS', exampleSentence: 'The pandemic caused unprecedented disruption.', synonyms: ['unparalleled', 'unmatched'], partOfSpeech: 'adjective' },
  { id: 'ie-x4', englishWord: 'ubiquitous', indonesianTranslation: 'berada di mana-mana', difficulty: 'expert', category: 'IELTS', exampleSentence: 'Coffee shops are ubiquitous in this city.', synonyms: ['omnipresent', 'everywhere'], partOfSpeech: 'adjective' },
  { id: 'ie-x5', englishWord: 'paradoxical', indonesianTranslation: 'paradoks/bertentangan', difficulty: 'expert', category: 'IELTS', exampleSentence: 'It is paradoxical that less is sometimes more.', synonyms: ['contradictory', 'incongruous'], partOfSpeech: 'adjective' },

  // ==================== SAT ====================
  // Medium
  { id: 'sat-m1', englishWord: 'candid', indonesianTranslation: 'terus terang', difficulty: 'medium', category: 'SAT', exampleSentence: 'She gave a candid interview about her struggles.', synonyms: ['honest', 'frank'], partOfSpeech: 'adjective' },
  { id: 'sat-m2', englishWord: 'diligent', indonesianTranslation: 'rajin', difficulty: 'medium', category: 'SAT', exampleSentence: 'The diligent student always completes homework.', synonyms: ['hardworking', 'industrious'], partOfSpeech: 'adjective' },
  { id: 'sat-m3', englishWord: 'nostalgia', indonesianTranslation: 'nostalgia', difficulty: 'medium', category: 'SAT', exampleSentence: 'The old photo filled her with nostalgia.', synonyms: ['longing', 'reminiscence'], partOfSpeech: 'noun' },
  { id: 'sat-m4', englishWord: 'superficial', indonesianTranslation: 'dangkal', difficulty: 'medium', category: 'SAT', exampleSentence: 'The wound was only superficial.', synonyms: ['shallow', 'cursory'], partOfSpeech: 'adjective' },
  { id: 'sat-m5', englishWord: 'adept', indonesianTranslation: 'mahir', difficulty: 'medium', category: 'SAT', exampleSentence: 'He is adept at learning new languages.', synonyms: ['skilled', 'proficient'], partOfSpeech: 'adjective' },
  { id: 'sat-m6', englishWord: 'clarify', indonesianTranslation: 'mengklarifikasi', difficulty: 'medium', category: 'SAT', exampleSentence: 'Please clarify your point.', synonyms: ['explain', 'clear up'], partOfSpeech: 'verb' },
  { id: 'sat-m7', englishWord: 'innovative', indonesianTranslation: 'inovatif', difficulty: 'medium', category: 'SAT', exampleSentence: 'She proposed an innovative solution.', synonyms: ['creative', 'inventive'], partOfSpeech: 'adjective' },
  { id: 'sat-m8', englishWord: 'lucid', indonesianTranslation: 'jernih/jelas', difficulty: 'medium', category: 'SAT', exampleSentence: 'His explanation was completely lucid.', synonyms: ['clear', 'understandable'], partOfSpeech: 'adjective' },
  { id: 'sat-m9', englishWord: 'modest', indonesianTranslation: 'rendah hati', difficulty: 'medium', category: 'SAT', exampleSentence: 'She remains modest despite her success.', synonyms: ['humble', 'unpretentious'], partOfSpeech: 'adjective' },
  { id: 'sat-m10', englishWord: 'prolific', indonesianTranslation: 'produktif', difficulty: 'medium', category: 'SAT', exampleSentence: 'He was a prolific writer, publishing 50 books.', synonyms: ['productive', 'fruitful'], partOfSpeech: 'adjective' },
  // Hard
  { id: 'sat-h1', englishWord: 'abridge', indonesianTranslation: 'meringkas', difficulty: 'hard', category: 'SAT', exampleSentence: 'The editor decided to abridge the novel.', synonyms: ['shorten', 'condense'], partOfSpeech: 'verb' },
  { id: 'sat-h2', englishWord: 'benevolent', indonesianTranslation: 'baik hati', difficulty: 'hard', category: 'SAT', exampleSentence: 'The benevolent king helped the poor.', synonyms: ['kind', 'charitable'], partOfSpeech: 'adjective' },
  { id: 'sat-h3', englishWord: 'eloquent', indonesianTranslation: 'fasih', difficulty: 'hard', category: 'SAT', exampleSentence: 'The speaker delivered an eloquent speech.', synonyms: ['articulate', 'expressive'], partOfSpeech: 'adjective' },
  { id: 'sat-h4', englishWord: 'fervent', indonesianTranslation: 'bersemangat', difficulty: 'hard', category: 'SAT', exampleSentence: 'She is a fervent supporter of the cause.', synonyms: ['passionate', 'ardent'], partOfSpeech: 'adjective' },
  { id: 'sat-h5', englishWord: 'impartial', indonesianTranslation: 'tidak memihak', difficulty: 'hard', category: 'SAT', exampleSentence: 'A judge must be impartial.', synonyms: ['unbiased', 'neutral'], partOfSpeech: 'adjective' },
  { id: 'sat-h6', englishWord: 'lethargic', indonesianTranslation: 'lesu', difficulty: 'hard', category: 'SAT', exampleSentence: 'The hot weather made everyone lethargic.', synonyms: ['sluggish', 'drowsy'], partOfSpeech: 'adjective' },
  { id: 'sat-h7', englishWord: 'meticulous', indonesianTranslation: 'teliti', difficulty: 'hard', category: 'SAT', exampleSentence: 'She is meticulous about her work.', synonyms: ['careful', 'thorough'], partOfSpeech: 'adjective' },
  { id: 'sat-h8', englishWord: 'obscure', indonesianTranslation: 'tidak jelas', difficulty: 'hard', category: 'SAT', exampleSentence: 'The meaning of the poem is obscure.', synonyms: ['unclear', 'ambiguous'], partOfSpeech: 'adjective' },
  { id: 'sat-h9', englishWord: 'resilient', indonesianTranslation: 'tangguh', difficulty: 'hard', category: 'SAT', exampleSentence: 'Children are remarkably resilient.', synonyms: ['tough', 'adaptable'], partOfSpeech: 'adjective' },
  { id: 'sat-h10', englishWord: 'venerate', indonesianTranslation: 'menghormati', difficulty: 'hard', category: 'SAT', exampleSentence: 'They venerate their ancestors.', synonyms: ['revere', 'worship'], partOfSpeech: 'verb' },
  // Expert
  { id: 'sat-x1', englishWord: 'gregarious', indonesianTranslation: 'suka bergaul', difficulty: 'expert', category: 'SAT', exampleSentence: 'His gregarious nature made him popular.', synonyms: ['sociable', 'outgoing'], partOfSpeech: 'adjective' },
  { id: 'sat-x2', englishWord: 'hackneyed', indonesianTranslation: 'klise', difficulty: 'expert', category: 'SAT', exampleSentence: 'The plot was full of hackneyed clichés.', synonyms: ['overused', 'trite'], partOfSpeech: 'adjective' },
  { id: 'sat-x3', englishWord: 'juxtapose', indonesianTranslation: 'menyandingkan', difficulty: 'expert', category: 'SAT', exampleSentence: 'The artist juxtaposed light and shadow.', synonyms: ['compare', 'contrast'], partOfSpeech: 'verb' },
  { id: 'sat-x4', englishWord: 'tenacious', indonesianTranslation: 'gigih', difficulty: 'expert', category: 'SAT', exampleSentence: 'The tenacious athlete never gave up.', synonyms: ['persistent', 'determined'], partOfSpeech: 'adjective' },
  { id: 'sat-x5', englishWord: 'ephemeral', indonesianTranslation: 'sementara', difficulty: 'expert', category: 'SAT', exampleSentence: 'The beauty of a sunset is ephemeral.', synonyms: ['transient', 'fleeting'], partOfSpeech: 'adjective' },

  // ==================== BUSINESS ENGLISH ====================
  // Easy
  { id: 'be-e1', englishWord: 'meeting', indonesianTranslation: 'rapat', difficulty: 'easy', category: 'Business English', exampleSentence: 'We have a meeting at 10 AM.', synonyms: ['gathering', 'assembly'], partOfSpeech: 'noun' },
  { id: 'be-e2', englishWord: 'client', indonesianTranslation: 'klien', difficulty: 'easy', category: 'Business English', exampleSentence: 'The client signed the contract.', synonyms: ['customer', 'buyer'], partOfSpeech: 'noun' },
  { id: 'be-e3', englishWord: 'office', indonesianTranslation: 'kantor', difficulty: 'easy', category: 'Business English', exampleSentence: 'I am going to the office.', synonyms: ['workplace'], partOfSpeech: 'noun' },
  { id: 'be-e4', englishWord: 'boss', indonesianTranslation: 'bos', difficulty: 'easy', category: 'Business English', exampleSentence: 'My boss gave me a promotion.', synonyms: ['manager', 'employer'], partOfSpeech: 'noun' },
  { id: 'be-e5', englishWord: 'salary', indonesianTranslation: 'gaji', difficulty: 'easy', category: 'Business English', exampleSentence: 'They increased my salary.', synonyms: ['pay', 'wage'], partOfSpeech: 'noun' },
  { id: 'be-e6', englishWord: 'job', indonesianTranslation: 'pekerjaan', difficulty: 'easy', category: 'Business English', exampleSentence: 'He is looking for a new job.', synonyms: ['work', 'occupation'], partOfSpeech: 'noun' },
  { id: 'be-e7', englishWord: 'company', indonesianTranslation: 'perusahaan', difficulty: 'easy', category: 'Business English', exampleSentence: 'She works for a tech company.', synonyms: ['business', 'firm'], partOfSpeech: 'noun' },
  { id: 'be-e8', englishWord: 'sell', indonesianTranslation: 'menjual', difficulty: 'easy', category: 'Business English', exampleSentence: 'They sell software products.', synonyms: ['vend', 'trade'], partOfSpeech: 'verb' },
  { id: 'be-e9', englishWord: 'buy', indonesianTranslation: 'membeli', difficulty: 'easy', category: 'Business English', exampleSentence: 'We need to buy new equipment.', synonyms: ['purchase'], partOfSpeech: 'verb' },
  { id: 'be-e10', englishWord: 'team', indonesianTranslation: 'tim', difficulty: 'easy', category: 'Business English', exampleSentence: 'Our team is very productive.', synonyms: ['group', 'crew'], partOfSpeech: 'noun' },
  // Medium
  { id: 'be-m1', englishWord: 'negotiate', indonesianTranslation: 'bernegosiasi', difficulty: 'medium', category: 'Business English', exampleSentence: 'We need to negotiate better terms.', synonyms: ['bargain', 'discuss'], partOfSpeech: 'verb' },
  { id: 'be-m2', englishWord: 'revenue', indonesianTranslation: 'pendapatan', difficulty: 'medium', category: 'Business English', exampleSentence: 'The company reported strong revenue growth.', synonyms: ['income', 'earnings'], partOfSpeech: 'noun' },
  { id: 'be-m3', englishWord: 'stakeholder', indonesianTranslation: 'pemangku kepentingan', difficulty: 'medium', category: 'Business English', exampleSentence: 'All stakeholders must be informed.', synonyms: ['shareholder', 'participant'], partOfSpeech: 'noun' },
  { id: 'be-m4', englishWord: 'benchmark', indonesianTranslation: 'tolok ukur', difficulty: 'medium', category: 'Business English', exampleSentence: 'This study serves as a benchmark.', synonyms: ['standard', 'reference'], partOfSpeech: 'noun' },
  { id: 'be-m5', englishWord: 'collaborate', indonesianTranslation: 'berkolaborasi', difficulty: 'medium', category: 'Business English', exampleSentence: 'The teams will collaborate on this project.', synonyms: ['cooperate', 'work together'], partOfSpeech: 'verb' },
  { id: 'be-m6', englishWord: 'delegate', indonesianTranslation: 'mendelegasikan', difficulty: 'medium', category: 'Business English', exampleSentence: 'A good manager knows how to delegate tasks.', synonyms: ['assign', 'entrust'], partOfSpeech: 'verb' },
  { id: 'be-m7', englishWord: 'forecast', indonesianTranslation: 'perkiraan', difficulty: 'medium', category: 'Business English', exampleSentence: 'The sales forecast looks promising.', synonyms: ['prediction', 'projection'], partOfSpeech: 'noun' },
  { id: 'be-m8', englishWord: 'implement', indonesianTranslation: 'menerapkan', difficulty: 'medium', category: 'Business English', exampleSentence: 'We will implement the new policy next week.', synonyms: ['execute', 'carry out'], partOfSpeech: 'verb' },
  { id: 'be-m9', englishWord: 'incentive', indonesianTranslation: 'insentif', difficulty: 'medium', category: 'Business English', exampleSentence: 'The bonus serves as an incentive.', synonyms: ['motivation', 'reward'], partOfSpeech: 'noun' },
  { id: 'be-m10', englishWord: 'agenda', indonesianTranslation: 'agenda', difficulty: 'medium', category: 'Business English', exampleSentence: 'What is on the agenda for today?', synonyms: ['schedule', 'plan'], partOfSpeech: 'noun' },
  // Hard
  { id: 'be-h1', englishWord: 'leverage', indonesianTranslation: 'memanfaatkan', difficulty: 'hard', category: 'Business English', exampleSentence: 'We should leverage our existing resources.', synonyms: ['utilize', 'exploit'], partOfSpeech: 'verb' },
  { id: 'be-h2', englishWord: 'acquisition', indonesianTranslation: 'akuisisi', difficulty: 'hard', category: 'Business English', exampleSentence: 'The company announced a major acquisition.', synonyms: ['purchase', 'takeover'], partOfSpeech: 'noun' },
  { id: 'be-h3', englishWord: 'diversify', indonesianTranslation: 'mendiversifikasi', difficulty: 'hard', category: 'Business English', exampleSentence: 'The company plans to diversify its portfolio.', synonyms: ['expand', 'vary'], partOfSpeech: 'verb' },
  { id: 'be-h4', englishWord: 'streamline', indonesianTranslation: 'menyederhanakan', difficulty: 'hard', category: 'Business English', exampleSentence: 'We need to streamline our processes.', synonyms: ['simplify', 'optimize'], partOfSpeech: 'verb' },
  { id: 'be-h5', englishWord: 'scalable', indonesianTranslation: 'terukur', difficulty: 'hard', category: 'Business English', exampleSentence: 'The solution must be scalable.', synonyms: ['expandable', 'flexible'], partOfSpeech: 'adjective' },
  { id: 'be-h6', englishWord: 'liability', indonesianTranslation: 'kewajiban/tanggung jawab', difficulty: 'hard', category: 'Business English', exampleSentence: 'The company has a massive financial liability.', synonyms: ['debt', 'accountability'], partOfSpeech: 'noun' },
  { id: 'be-h7', englishWord: 'monopoly', indonesianTranslation: 'monopoli', difficulty: 'hard', category: 'Business English', exampleSentence: 'They hold a monopoly in the market.', synonyms: ['domination', 'control'], partOfSpeech: 'noun' },
  { id: 'be-h8', englishWord: 'liquidate', indonesianTranslation: 'melikuidasi', difficulty: 'hard', category: 'Business English', exampleSentence: 'The bankrupt firm had to liquidate its assets.', synonyms: ['cash in', 'sell off'], partOfSpeech: 'verb' },
  { id: 'be-h9', englishWord: 'subsidiary', indonesianTranslation: 'anak perusahaan', difficulty: 'hard', category: 'Business English', exampleSentence: 'The subsidiary operates independently.', synonyms: ['branch', 'division'], partOfSpeech: 'noun' },
  { id: 'be-h10', englishWord: 'synergy', indonesianTranslation: 'sinergi', difficulty: 'hard', category: 'Business English', exampleSentence: 'The merger will create powerful synergy.', synonyms: ['collaboration', 'cooperation'], partOfSpeech: 'noun' },
  // Expert
  { id: 'be-x1', englishWord: 'amortization', indonesianTranslation: 'amortisasi (penyusutan utang)', difficulty: 'expert', category: 'Business English', exampleSentence: 'The loan amortization schedule spans 10 years.', synonyms: ['repayment', 'depreciation'], partOfSpeech: 'noun' },
  { id: 'be-x2', englishWord: 'fiduciary', indonesianTranslation: 'kewajiban fidusia (kepercayaan)', difficulty: 'expert', category: 'Business English', exampleSentence: 'The board has a fiduciary duty to shareholders.', synonyms: ['trustee', 'guardian'], partOfSpeech: 'adjective' },
  { id: 'be-x3', englishWord: 'remuneration', indonesianTranslation: 'remunerasi (imbalan)', difficulty: 'expert', category: 'Business English', exampleSentence: 'He received generous remuneration for his services.', synonyms: ['compensation', 'payment'], partOfSpeech: 'noun' },
  { id: 'be-x4', englishWord: 'conglomerate', indonesianTranslation: 'konglomerat', difficulty: 'expert', category: 'Business English', exampleSentence: 'The conglomerate owns dozens of media channels.', synonyms: ['corporation', 'multinational'], partOfSpeech: 'noun' },

  // ==================== ACADEMIC WORDS ====================
  // Medium
  { id: 'aw-m1', englishWord: 'analyze', indonesianTranslation: 'menganalisis', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'Researchers analyze the data carefully.', synonyms: ['examine', 'study'], partOfSpeech: 'verb' },
  { id: 'aw-m2', englishWord: 'derive', indonesianTranslation: 'memperoleh', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'Many English words derive from Latin.', synonyms: ['obtain', 'originate'], partOfSpeech: 'verb' },
  { id: 'aw-m3', englishWord: 'facilitate', indonesianTranslation: 'memfasilitasi', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'Technology can facilitate learning.', synonyms: ['enable', 'assist'], partOfSpeech: 'verb' },
  { id: 'aw-m4', englishWord: 'assess', indonesianTranslation: 'menilai', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'The test will assess your understanding.', synonyms: ['evaluate', 'judge'], partOfSpeech: 'verb' },
  { id: 'aw-m5', englishWord: 'concept', indonesianTranslation: 'konsep', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'The concept of gravity is fundamental.', synonyms: ['idea', 'notion'], partOfSpeech: 'noun' },
  { id: 'aw-m6', englishWord: 'context', indonesianTranslation: 'konteks', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'You must read the word in context.', synonyms: ['background', 'situation'], partOfSpeech: 'noun' },
  { id: 'aw-m7', englishWord: 'define', indonesianTranslation: 'mendefinisikan', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'How do you define success?', synonyms: ['explain', 'describe'], partOfSpeech: 'verb' },
  { id: 'aw-m8', englishWord: 'establish', indonesianTranslation: 'mendirikan/menetapkan', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'They plan to establish a new research center.', synonyms: ['create', 'found'], partOfSpeech: 'verb' },
  { id: 'aw-m9', englishWord: 'factor', indonesianTranslation: 'faktor', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'Price was a major factor in the decision.', synonyms: ['element', 'aspect'], partOfSpeech: 'noun' },
  { id: 'aw-m10', englishWord: 'indicate', indonesianTranslation: 'menunjukkan', difficulty: 'medium', category: 'Academic Words', exampleSentence: 'The results indicate a positive trend.', synonyms: ['show', 'suggest'], partOfSpeech: 'verb' },
  // Hard
  { id: 'aw-h1', englishWord: 'hypothesis', indonesianTranslation: 'hipotesis', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'The hypothesis was tested through experiments.', synonyms: ['theory', 'assumption'], partOfSpeech: 'noun' },
  { id: 'aw-h2', englishWord: 'phenomenon', indonesianTranslation: 'fenomena', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'The northern lights are a natural phenomenon.', synonyms: ['occurrence', 'event'], partOfSpeech: 'noun' },
  { id: 'aw-h3', englishWord: 'synthesize', indonesianTranslation: 'menyintesis', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'Students must synthesize information from multiple sources.', synonyms: ['combine', 'integrate'], partOfSpeech: 'verb' },
  { id: 'aw-h4', englishWord: 'methodology', indonesianTranslation: 'metodologi', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'The methodology used in this study is rigorous.', synonyms: ['approach', 'technique'], partOfSpeech: 'noun' },
  { id: 'aw-h5', englishWord: 'correlate', indonesianTranslation: 'berkorelasi', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'Income levels correlate with education.', synonyms: ['relate', 'correspond'], partOfSpeech: 'verb' },
  { id: 'aw-h6', englishWord: 'implication', indonesianTranslation: 'implikasi', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'The findings have important implications.', synonyms: ['consequence', 'effect'], partOfSpeech: 'noun' },
  { id: 'aw-h7', englishWord: 'inherent', indonesianTranslation: 'melekat', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'Risk is inherent in any investment.', synonyms: ['intrinsic', 'innate'], partOfSpeech: 'adjective' },
  { id: 'aw-h8', englishWord: 'constitute', indonesianTranslation: 'merupakan', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'Women constitute 52% of the population.', synonyms: ['form', 'represent'], partOfSpeech: 'verb' },
  { id: 'aw-h9', englishWord: 'subsequent', indonesianTranslation: 'selanjutnya', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'Subsequent research confirmed the findings.', synonyms: ['following', 'succeeding'], partOfSpeech: 'adjective' },
  { id: 'aw-h10', englishWord: 'empirical', indonesianTranslation: 'empiris', difficulty: 'hard', category: 'Academic Words', exampleSentence: 'The paper provides empirical evidence.', synonyms: ['observed', 'practical'], partOfSpeech: 'adjective' },
  // Expert
  { id: 'aw-x1', englishWord: 'paradigm', indonesianTranslation: 'paradigma', difficulty: 'expert', category: 'Academic Words', exampleSentence: 'This represents a paradigm shift in science.', synonyms: ['model', 'framework'], partOfSpeech: 'noun' },
  { id: 'aw-x2', englishWord: 'epistemology', indonesianTranslation: 'epistemologi', difficulty: 'expert', category: 'Academic Words', exampleSentence: 'Epistemology studies the nature of knowledge.', synonyms: ['theory of knowledge'], partOfSpeech: 'noun' },
  { id: 'aw-x3', englishWord: 'ontology', indonesianTranslation: 'ontologi', difficulty: 'expert', category: 'Academic Words', exampleSentence: 'Ontology is the philosophical study of being.', synonyms: ['metaphysics'], partOfSpeech: 'noun' },
  { id: 'aw-x4', englishWord: 'heuristic', indonesianTranslation: 'heuristik', difficulty: 'expert', category: 'Academic Words', exampleSentence: 'A heuristic method speeds up problem-solving.', synonyms: ['rule of thumb'], partOfSpeech: 'adjective' },

  // ==================== PHRASAL VERBS ====================
  // Easy
  { id: 'pv-e1', englishWord: 'figure out', indonesianTranslation: 'mencari tahu', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'I need to figure out the solution.', synonyms: ['solve', 'determine'], partOfSpeech: 'phrase' },
  { id: 'pv-e2', englishWord: 'give up', indonesianTranslation: 'menyerah', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Never give up on your dreams.', synonyms: ['quit', 'surrender'], partOfSpeech: 'phrase' },
  { id: 'pv-e3', englishWord: 'set up', indonesianTranslation: 'mendirikan / memasang', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'They set up a new business.', synonyms: ['establish', 'arrange'], partOfSpeech: 'phrase' },
  { id: 'pv-e4', englishWord: 'work out', indonesianTranslation: 'berolahraga / menyelesaikan', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Everything will work out in the end.', synonyms: ['exercise', 'resolve'], partOfSpeech: 'phrase' },
  { id: 'pv-e5', englishWord: 'wake up', indonesianTranslation: 'bangun tidur', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'I wake up at 7 AM.', synonyms: ['get up', 'arise'], partOfSpeech: 'phrase' },
  { id: 'pv-e6', englishWord: 'sit down', indonesianTranslation: 'duduk', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Please sit down.', synonyms: ['take a seat'], partOfSpeech: 'phrase' },
  { id: 'pv-e7', englishWord: 'stand up', indonesianTranslation: 'berdiri', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Stand up when the teacher enters.', synonyms: ['rise'], partOfSpeech: 'phrase' },
  { id: 'pv-e8', englishWord: 'turn on', indonesianTranslation: 'menyalakan', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Turn on the lights, please.', synonyms: ['switch on'], partOfSpeech: 'phrase' },
  { id: 'pv-e9', englishWord: 'turn off', indonesianTranslation: 'mematikan', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'Do not forget to turn off the TV.', synonyms: ['switch off'], partOfSpeech: 'phrase' },
  { id: 'pv-e10', englishWord: 'look for', indonesianTranslation: 'mencari', difficulty: 'easy', category: 'Phrasal Verbs', exampleSentence: 'I am looking for my keys.', synonyms: ['search for'], partOfSpeech: 'phrase' },
  // Medium
  { id: 'pv-m1', englishWord: 'break down', indonesianTranslation: 'rusak / mogok', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'The car broke down on the highway.', synonyms: ['malfunction', 'fail'], partOfSpeech: 'phrase' },
  { id: 'pv-m2', englishWord: 'bring up', indonesianTranslation: 'membesarkan / mengangkat topik', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'She brought up an interesting point.', synonyms: ['raise', 'mention'], partOfSpeech: 'phrase' },
  { id: 'pv-m3', englishWord: 'call off', indonesianTranslation: 'membatalkan', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'They called off the meeting.', synonyms: ['cancel', 'abandon'], partOfSpeech: 'phrase' },
  { id: 'pv-m4', englishWord: 'come across', indonesianTranslation: 'menemukan secara kebetulan', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'I came across an old photo album.', synonyms: ['find', 'encounter'], partOfSpeech: 'phrase' },
  { id: 'pv-m5', englishWord: 'look forward to', indonesianTranslation: 'menantikan', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'I look forward to meeting you.', synonyms: ['anticipate', 'await'], partOfSpeech: 'phrase' },
  { id: 'pv-m6', englishWord: 'make up', indonesianTranslation: 'mengarang / berdamai', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'They made up after the argument.', synonyms: ['reconcile', 'fabricate'], partOfSpeech: 'phrase' },
  { id: 'pv-m7', englishWord: 'put off', indonesianTranslation: 'menunda', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'Do not put off your homework.', synonyms: ['postpone', 'delay'], partOfSpeech: 'phrase' },
  { id: 'pv-m8', englishWord: 'run out of', indonesianTranslation: 'kehabisan', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'We ran out of milk.', synonyms: ['exhaust', 'deplete'], partOfSpeech: 'phrase' },
  { id: 'pv-m9', englishWord: 'take over', indonesianTranslation: 'mengambil alih', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'The new CEO will take over next month.', synonyms: ['assume control', 'replace'], partOfSpeech: 'phrase' },
  { id: 'pv-m10', englishWord: 'turn down', indonesianTranslation: 'menolak', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'She turned down the job offer.', synonyms: ['reject', 'decline'], partOfSpeech: 'phrase' },
  // Hard
  { id: 'pv-h1', englishWord: 'get away with', indonesianTranslation: 'lolos dari hukuman', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'He got away with cheating.', synonyms: ['escape blame'], partOfSpeech: 'phrase' },
  { id: 'pv-h2', englishWord: 'put up with', indonesianTranslation: 'mentoleransi', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'I cannot put up with this noise anymore.', synonyms: ['tolerate', 'endure'], partOfSpeech: 'phrase' },
  { id: 'pv-h3', englishWord: 'look down on', indonesianTranslation: 'meremehkan', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'Do not look down on people who have less.', synonyms: ['despise', 'scorn'], partOfSpeech: 'phrase' },
  { id: 'pv-h4', englishWord: 'catch up on', indonesianTranslation: 'menyusul ketertinggalan', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'I need to catch up on my sleep.', synonyms: ['make up for'], partOfSpeech: 'phrase' },
  { id: 'pv-h5', englishWord: 'fall out with', indonesianTranslation: 'bertengkar dengan', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'She fell out with her best friend.', synonyms: ['argue', 'quarrel'], partOfSpeech: 'phrase' },
  { id: 'pv-h6', englishWord: 'back down', indonesianTranslation: 'mengalah', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'He refused to back down from the argument.', synonyms: ['yield', 'surrender'], partOfSpeech: 'phrase' },
  { id: 'pv-h7', englishWord: 'boil down to', indonesianTranslation: 'pada intinya', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'It all boils down to money.', synonyms: ['come down to', 'amount to'], partOfSpeech: 'phrase' },
  { id: 'pv-h8', englishWord: 'brush up on', indonesianTranslation: 'menyegarkan ingatan/keahlian', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'I need to brush up on my French.', synonyms: ['revise', 'refresh'], partOfSpeech: 'phrase' },
  { id: 'pv-h9', englishWord: 'chalk up to', indonesianTranslation: 'menganggap sebagai akibat dari', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'We can chalk that mistake up to inexperience.', synonyms: ['attribute to', 'credit to'], partOfSpeech: 'phrase' },
  { id: 'pv-h10', englishWord: 'iron out', indonesianTranslation: 'menyelesaikan masalah', difficulty: 'hard', category: 'Phrasal Verbs', exampleSentence: 'We need to iron out these details.', synonyms: ['resolve', 'settle'], partOfSpeech: 'phrase' },

  // ==================== IDIOMS ====================
  // Medium
  { id: 'id-m1', englishWord: 'piece of cake', indonesianTranslation: 'sangat mudah', difficulty: 'medium', category: 'Idioms', exampleSentence: 'The exam was a piece of cake.', synonyms: ['easy', 'simple'], partOfSpeech: 'phrase' },
  { id: 'id-m2', englishWord: 'break the ice', indonesianTranslation: 'mencairkan suasana', difficulty: 'medium', category: 'Idioms', exampleSentence: 'His joke helped break the ice.', synonyms: ['start conversation', 'ease tension'], partOfSpeech: 'phrase' },
  { id: 'id-m3', englishWord: 'under the weather', indonesianTranslation: 'kurang sehat', difficulty: 'medium', category: 'Idioms', exampleSentence: 'I am feeling a bit under the weather today.', synonyms: ['sick', 'ill'], partOfSpeech: 'phrase' },
  { id: 'id-m4', englishWord: 'once in a blue moon', indonesianTranslation: 'sangat jarang', difficulty: 'medium', category: 'Idioms', exampleSentence: 'I only eat fast food once in a blue moon.', synonyms: ['rarely', 'seldom'], partOfSpeech: 'phrase' },
  { id: 'id-m5', englishWord: 'spill the beans', indonesianTranslation: 'membocorkan rahasia', difficulty: 'medium', category: 'Idioms', exampleSentence: 'Who spilled the beans about the surprise?', synonyms: ['reveal', 'disclose'], partOfSpeech: 'phrase' },
  { id: 'id-m6', englishWord: 'beat around the bush', indonesianTranslation: 'berbelit-belit', difficulty: 'medium', category: 'Idioms', exampleSentence: 'Stop beating around the bush and tell me.', synonyms: ['be indirect', 'avoid'], partOfSpeech: 'phrase' },
  { id: 'id-m7', englishWord: 'call it a day', indonesianTranslation: 'menyudahi pekerjaan', difficulty: 'medium', category: 'Idioms', exampleSentence: 'It is late, let us call it a day.', synonyms: ['stop working', 'finish'], partOfSpeech: 'phrase' },
  { id: 'id-m8', englishWord: 'hang in there', indonesianTranslation: 'tetap bertahan', difficulty: 'medium', category: 'Idioms', exampleSentence: 'Hang in there, things will get better.', synonyms: ['persevere', 'endure'], partOfSpeech: 'phrase' },
  { id: 'id-m9', englishWord: 'hit the sack', indonesianTranslation: 'pergi tidur', difficulty: 'medium', category: 'Idioms', exampleSentence: 'I am exhausted, time to hit the sack.', synonyms: ['go to bed', 'sleep'], partOfSpeech: 'phrase' },
  { id: 'id-m10', englishWord: 'on the ball', indonesianTranslation: 'sangat tanggap/fokus', difficulty: 'medium', category: 'Idioms', exampleSentence: 'You need to be on the ball to succeed.', synonyms: ['alert', 'attentive'], partOfSpeech: 'phrase' },
  // Hard
  { id: 'id-h1', englishWord: 'hit the nail on the head', indonesianTranslation: 'tepat sasaran', difficulty: 'hard', category: 'Idioms', exampleSentence: 'You hit the nail on the head with that analysis.', synonyms: ['be accurate', 'be correct'], partOfSpeech: 'phrase' },
  { id: 'id-h2', englishWord: 'cost an arm and a leg', indonesianTranslation: 'sangat mahal', difficulty: 'hard', category: 'Idioms', exampleSentence: 'That car costs an arm and a leg.', synonyms: ['expensive', 'pricey'], partOfSpeech: 'phrase' },
  { id: 'id-h3', englishWord: 'bite the bullet', indonesianTranslation: 'menerima hal sulit', difficulty: 'hard', category: 'Idioms', exampleSentence: 'We need to bite the bullet and make a decision.', synonyms: ['endure', 'face difficulty'], partOfSpeech: 'phrase' },
  { id: 'id-h4', englishWord: 'burn the midnight oil', indonesianTranslation: 'begadang untuk bekerja', difficulty: 'hard', category: 'Idioms', exampleSentence: 'Students burn the midnight oil before exams.', synonyms: ['work late', 'study hard'], partOfSpeech: 'phrase' },
  { id: 'id-h5', englishWord: 'let the cat out of the bag', indonesianTranslation: 'membocorkan rahasia', difficulty: 'hard', category: 'Idioms', exampleSentence: 'She let the cat out of the bag accidentally.', synonyms: ['reveal secret', 'disclose'], partOfSpeech: 'phrase' },
  { id: 'id-h6', englishWord: 'the ball is in your court', indonesianTranslation: 'giliranmu untuk bertindak', difficulty: 'hard', category: 'Idioms', exampleSentence: 'I have made my offer. The ball is in your court.', synonyms: ['your turn', 'your decision'], partOfSpeech: 'phrase' },
  { id: 'id-h7', englishWord: 'by the skin of your teeth', indonesianTranslation: 'nyaris / hampir saja', difficulty: 'hard', category: 'Idioms', exampleSentence: 'He passed the exam by the skin of his teeth.', synonyms: ['narrowly', 'barely'], partOfSpeech: 'phrase' },
  { id: 'id-h8', englishWord: 'cut corners', indonesianTranslation: 'mengambil jalan pintas (kualitas turun)', difficulty: 'hard', category: 'Idioms', exampleSentence: 'Do not cut corners on this project.', synonyms: ['do poorly to save time/money'], partOfSpeech: 'phrase' },
  { id: 'id-h9', englishWord: 'elephant in the room', indonesianTranslation: 'masalah besar yang dihindari', difficulty: 'hard', category: 'Idioms', exampleSentence: 'We need to discuss the elephant in the room.', synonyms: ['obvious problem'], partOfSpeech: 'phrase' },
  { id: 'id-h10', englishWord: 'jump on the bandwagon', indonesianTranslation: 'ikut-ikutan tren', difficulty: 'hard', category: 'Idioms', exampleSentence: 'Many companies are jumping on the AI bandwagon.', synonyms: ['follow the trend'], partOfSpeech: 'phrase' },

  // ==================== SLANG ====================
  // Easy
  { id: 'sl-e1', englishWord: 'chill', indonesianTranslation: 'santai', difficulty: 'easy', category: 'Slang', exampleSentence: 'Let us just chill this weekend.', synonyms: ['relax', 'hang out'], partOfSpeech: 'verb' },
  { id: 'sl-e2', englishWord: 'vibe', indonesianTranslation: 'suasana / aura', difficulty: 'easy', category: 'Slang', exampleSentence: 'This place has a great vibe.', synonyms: ['atmosphere', 'feeling'], partOfSpeech: 'noun' },
  { id: 'sl-e3', englishWord: 'flex', indonesianTranslation: 'pamer', difficulty: 'easy', category: 'Slang', exampleSentence: 'He likes to flex his new car.', synonyms: ['show off', 'brag'], partOfSpeech: 'verb' },
  { id: 'sl-e4', englishWord: 'sus', indonesianTranslation: 'mencurigakan', difficulty: 'easy', category: 'Slang', exampleSentence: 'That behavior is kinda sus.', synonyms: ['suspicious', 'shady'], partOfSpeech: 'adjective' },
  { id: 'sl-e5', englishWord: 'lit', indonesianTranslation: 'seru / keren', difficulty: 'easy', category: 'Slang', exampleSentence: 'The party last night was lit!', synonyms: ['amazing', 'exciting'], partOfSpeech: 'adjective' },
  { id: 'sl-e6', englishWord: 'slay', indonesianTranslation: 'tampil luar biasa', difficulty: 'easy', category: 'Slang', exampleSentence: 'You really slayed in that outfit!', synonyms: ['dominate', 'excel'], partOfSpeech: 'verb' },
  { id: 'sl-e7', englishWord: 'cap', indonesianTranslation: 'bohong', difficulty: 'easy', category: 'Slang', exampleSentence: 'That is cap, I do not believe you.', synonyms: ['lie', 'falsehood'], partOfSpeech: 'noun' },
  { id: 'sl-e8', englishWord: 'bro', indonesianTranslation: 'saudara laki-laki / teman', difficulty: 'easy', category: 'Slang', exampleSentence: 'What is up, bro?', synonyms: ['friend', 'mate'], partOfSpeech: 'noun' },
  { id: 'sl-e9', englishWord: 'cool', indonesianTranslation: 'keren', difficulty: 'easy', category: 'Slang', exampleSentence: 'That jacket is so cool.', synonyms: ['awesome', 'great'], partOfSpeech: 'adjective' },
  { id: 'sl-e10', englishWord: 'cringe', indonesianTranslation: 'memalukan / bikin ngeri', difficulty: 'easy', category: 'Slang', exampleSentence: 'That video was so cringe.', synonyms: ['embarrassing', 'awkward'], partOfSpeech: 'adjective' },
  // Medium
  { id: 'sl-m1', englishWord: 'ghosting', indonesianTranslation: 'menghilang tanpa kabar', difficulty: 'medium', category: 'Slang', exampleSentence: 'He started ghosting me after our date.', synonyms: ['ignoring', 'disappearing'], partOfSpeech: 'noun' },
  { id: 'sl-m2', englishWord: 'salty', indonesianTranslation: 'kesal / jengkel', difficulty: 'medium', category: 'Slang', exampleSentence: 'She is salty about losing the game.', synonyms: ['bitter', 'upset'], partOfSpeech: 'adjective' },
  { id: 'sl-m3', englishWord: 'lowkey', indonesianTranslation: 'diam-diam / sedikit', difficulty: 'medium', category: 'Slang', exampleSentence: 'I lowkey want to go to the party.', synonyms: ['secretly', 'somewhat'], partOfSpeech: 'adverb' },
  { id: 'sl-m4', englishWord: 'savage', indonesianTranslation: 'kejam / berani', difficulty: 'medium', category: 'Slang', exampleSentence: 'That comeback was savage!', synonyms: ['fierce', 'bold'], partOfSpeech: 'adjective' },
  { id: 'sl-m5', englishWord: 'no cap', indonesianTranslation: 'serius / tidak bohong', difficulty: 'medium', category: 'Slang', exampleSentence: 'This is the best pizza ever, no cap.', synonyms: ['for real', 'honestly'], partOfSpeech: 'phrase' },
  { id: 'sl-m6', englishWord: 'glow up', indonesianTranslation: 'transformasi penampilan', difficulty: 'medium', category: 'Slang', exampleSentence: 'She had a major glow up over summer.', synonyms: ['transformation', 'improvement'], partOfSpeech: 'phrase' },
  { id: 'sl-m7', englishWord: 'boujee', indonesianTranslation: 'mewah / elit', difficulty: 'medium', category: 'Slang', exampleSentence: 'They always eat at boujee restaurants.', synonyms: ['luxurious', 'fancy'], partOfSpeech: 'adjective' },
  { id: 'sl-m8', englishWord: 'drip', indonesianTranslation: 'gaya pakaian keren', difficulty: 'medium', category: 'Slang', exampleSentence: 'Check out his new drip.', synonyms: ['style', 'swagger'], partOfSpeech: 'noun' },
  { id: 'sl-m9', englishWord: 'extra', indonesianTranslation: 'berlebihan / over', difficulty: 'medium', category: 'Slang', exampleSentence: 'She is being so extra today.', synonyms: ['over the top', 'dramatic'], partOfSpeech: 'adjective' },
  { id: 'sl-m10', englishWord: 'fomo', indonesianTranslation: 'takut ketinggalan tren', difficulty: 'medium', category: 'Slang', exampleSentence: 'I went to the party because of FOMO.', synonyms: ['fear of missing out'], partOfSpeech: 'noun' },
  // Hard
  { id: 'sl-h1', englishWord: 'gaslight', indonesianTranslation: 'memanipulasi pikiran', difficulty: 'hard', category: 'Slang', exampleSentence: 'Do not try to gaslight me into believing that.', synonyms: ['manipulate', 'deceive'], partOfSpeech: 'verb' },
  { id: 'sl-h2', englishWord: 'simp', indonesianTranslation: 'terlalu bucin', difficulty: 'hard', category: 'Slang', exampleSentence: 'He is such a simp for her.', synonyms: ['overly submissive'], partOfSpeech: 'noun' },
  { id: 'sl-h3', englishWord: 'cheugy', indonesianTranslation: 'kuno / norak', difficulty: 'hard', category: 'Slang', exampleSentence: 'Wearing that brand is considered cheugy now.', synonyms: ['outdated', 'uncool'], partOfSpeech: 'adjective' },
  { id: 'sl-h4', englishWord: 'stan', indonesianTranslation: 'fans fanatik', difficulty: 'hard', category: 'Slang', exampleSentence: 'I stan that band so much.', synonyms: ['obsessive fan', 'idolize'], partOfSpeech: 'verb' },
  { id: 'sl-h5', englishWord: 'gatekeep', indonesianTranslation: 'merahasiakan info/tren', difficulty: 'hard', category: 'Slang', exampleSentence: 'Stop gatekeeping that good song.', synonyms: ['withhold', 'restrict access'], partOfSpeech: 'verb' },

  // ==================== USER REQUESTED WORDS ====================
  { id: 'usr-1', englishWord: 'ached', indonesianTranslation: 'sakit / ngilu / sangat sedih', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'My head ached after a long day.', synonyms: ['hurt', 'throbbed'], partOfSpeech: 'verb' },
  { id: 'usr-2', englishWord: 'it is my custom', indonesianTranslation: 'itu adalah kebiasaanku', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'It is my custom to wake up early.', synonyms: ['my habit', 'my tradition'], partOfSpeech: 'phrase' },
  { id: 'usr-3', englishWord: 'gobble down', indonesianTranslation: 'melahap dengan cepat', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'He gobbled down his food quickly.', synonyms: ['devour', 'eat greedily'], partOfSpeech: 'phrase' },
  { id: 'usr-4', englishWord: 'gobbled', indonesianTranslation: 'makan dengan rakus', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'The turkeys gobbled in the yard.', synonyms: ['devour', 'gulp'], partOfSpeech: 'verb' },
  { id: 'usr-5', englishWord: 'nimble', indonesianTranslation: 'lincah / gesit', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'She has nimble fingers.', synonyms: ['agile', 'quick'], partOfSpeech: 'adjective' },
  { id: 'usr-6', englishWord: 'thieves', indonesianTranslation: 'para pencuri', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The thieves stole the painting.', synonyms: ['robbers', 'burglars'], partOfSpeech: 'noun' },
  { id: 'usr-7', englishWord: 'riverbank', indonesianTranslation: 'tepi sungai', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'We sat on the riverbank.', synonyms: ['riverside', 'shore'], partOfSpeech: 'noun' },
  { id: 'usr-8', englishWord: 'fast current', indonesianTranslation: 'arus deras', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'The river has a fast current.', synonyms: ['rapid flow', 'strong current'], partOfSpeech: 'phrase' },
  { id: 'usr-9', englishWord: 'beneath', indonesianTranslation: 'di bawah', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'The treasure is beneath the ground.', synonyms: ['under', 'below'], partOfSpeech: 'preposition' },
  { id: 'usr-10', englishWord: 'once more beneath', indonesianTranslation: 'sekali lagi di bawah', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He found himself once more beneath the old bridge.', synonyms: ['under again'], partOfSpeech: 'phrase' },
  { id: 'usr-11', englishWord: 'wet fur', indonesianTranslation: 'bulu basah', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The dog shook its wet fur.', synonyms: ['damp hair'], partOfSpeech: 'phrase' },
  { id: 'usr-12', englishWord: 'lasts', indonesianTranslation: 'bertahan / awet', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'This battery lasts a long time.', synonyms: ['endure', 'continue'], partOfSpeech: 'verb' },
  { id: 'usr-13', englishWord: 'custard', indonesianTranslation: 'krim manis / saus vla', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'I love eating apple pie with custard.', synonyms: ['sweet cream'], partOfSpeech: 'noun' },
  { id: 'usr-14', englishWord: 'shook', indonesianTranslation: 'menggoyang / sangat terkejut', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'She shook her head.', synonyms: ['trembled', 'surprised'], partOfSpeech: 'verb' },
  { id: 'usr-15', englishWord: 'chanted', indonesianTranslation: 'melantunkan / meneriakkan', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'The crowd chanted loudly.', synonyms: ['shout', 'sing'], partOfSpeech: 'verb' },
  { id: 'usr-16', englishWord: 'lifted up his jumper', indonesianTranslation: 'mengangkat sweternya', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He lifted up his jumper to show the scar.', synonyms: ['raise his sweater'], partOfSpeech: 'phrase' },
  { id: 'usr-17', englishWord: 'triumphantly', indonesianTranslation: 'dengan penuh kemenangan', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'He smiled triumphantly after winning.', synonyms: ['victoriously', 'proudly'], partOfSpeech: 'adverb' },
  { id: 'usr-18', englishWord: 'grownups', indonesianTranslation: 'orang dewasa', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'The grownups are talking in the living room.', synonyms: ['adults'], partOfSpeech: 'noun' },
  { id: 'usr-19', englishWord: 'carousel', indonesianTranslation: 'komidi putar / ban berjalan', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'We waited for our bags at the carousel.', synonyms: ['merry-go-round', 'conveyor belt'], partOfSpeech: 'noun' },
  { id: 'usr-20', englishWord: 'sat on the bench by the carousel', indonesianTranslation: 'duduk dekat ban berjalan bagasi', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'She sat on the bench by the carousel at the airport.', synonyms: ['waiting by the luggage belt'], partOfSpeech: 'phrase' },
  { id: 'usr-21', englishWord: 'luggage', indonesianTranslation: 'barang bawaan / koper', difficulty: 'easy', category: 'Daily Conversation', exampleSentence: 'Don\'t forget your luggage.', synonyms: ['baggage', 'suitcases'], partOfSpeech: 'noun' },
  { id: 'usr-22', englishWord: 'turban', indonesianTranslation: 'sorban / ikat kepala', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He wore a colorful turban.', synonyms: ['headwrap'], partOfSpeech: 'noun' },
  { id: 'usr-23', englishWord: 'inquisitive', indonesianTranslation: 'selalu ingin tahu / kepo', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'Cats are naturally inquisitive.', synonyms: ['curious', 'nosy'], partOfSpeech: 'adjective' },
  { id: 'usr-24', englishWord: 'moving in neat lines', indonesianTranslation: 'melaju dalam barisan yang rapi', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'There are a lot of cars but they\'re all moving in neat lines.', synonyms: ['driving in order'], partOfSpeech: 'phrase' },
  { id: 'usr-25', englishWord: 'sulked', indonesianTranslation: 'merajuk / ngambek', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He sulked after he didn\'t get his way.', synonyms: ['pout', 'brood'], partOfSpeech: 'verb' },
  { id: 'usr-26', englishWord: 'sulked off', indonesianTranslation: 'pergi sambil merajuk', difficulty: 'medium', category: 'Phrasal Verbs', exampleSentence: 'She sulked off to her room.', synonyms: ['leave angrily'], partOfSpeech: 'phrase' },
  { id: 'usr-27', englishWord: 'piled one', indonesianTranslation: 'menumpuk satu', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'He piled one box on top of the other.', synonyms: ['stack one'], partOfSpeech: 'phrase' },
  { id: 'usr-28', englishWord: 'saddened', indonesianTranslation: 'dibuat sedih', difficulty: 'medium', category: 'Daily Conversation', exampleSentence: 'I was saddened by the news.', synonyms: ['depressed', 'grieved'], partOfSpeech: 'verb' },
  { id: 'usr-29', englishWord: 'whilst', indonesianTranslation: 'sementara / padahal', difficulty: 'hard', category: 'Daily Conversation', exampleSentence: 'I read a book whilst waiting.', synonyms: ['while', 'although'], partOfSpeech: 'conjunction' },
];

// Helper to get all unique Indonesian translations for generating wrong answers
export function getAllTranslations(): string[] {
  return [...new Set(VOCABULARY.map(v => v.indonesianTranslation))];
}

// Get questions by category
export function getQuestionsByCategory(category: string): Question[] {
  if (category === 'all') return VOCABULARY;
  return VOCABULARY.filter(v => v.category === category);
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: string): Question[] {
  if (difficulty === 'all') return VOCABULARY;
  return VOCABULARY.filter(v => v.difficulty === difficulty);
}

// Get filtered questions
export function getFilteredQuestions(difficulty: string, category: string): Question[] {
  return VOCABULARY.filter(v => {
    const matchDifficulty = difficulty === 'all' || v.difficulty === difficulty;
    const matchCategory = category === 'all' || v.category === category;
    return matchDifficulty && matchCategory;
  });
}

// Shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate quiz options for a question
export function generateQuizOptions(question: Question, allQuestions: Question[]): { id: string; text: string; isCorrect: boolean }[] {
  const correctAnswer = question.indonesianTranslation;
  const wrongAnswers: string[] = [];

  // Get wrong answers from the same category first, then others
  const sameCategoryQuestions = allQuestions.filter(
    q => q.id !== question.id && q.indonesianTranslation !== correctAnswer
  );

  const shuffled = shuffleArray(sameCategoryQuestions);

  for (const q of shuffled) {
    if (!wrongAnswers.includes(q.indonesianTranslation) && q.indonesianTranslation !== correctAnswer) {
      wrongAnswers.push(q.indonesianTranslation);
      if (wrongAnswers.length === 3) break;
    }
  }

  const options = [
    { id: 'opt-correct', text: correctAnswer, isCorrect: true },
    ...wrongAnswers.map((answer, idx) => ({
      id: `opt-wrong-${idx}`,
      text: answer,
      isCorrect: false,
    })),
  ];

  return shuffleArray(options);
}
