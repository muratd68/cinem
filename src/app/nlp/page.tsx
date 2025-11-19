'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function NLPCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-600">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">NLP/SpaCy Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Dogal dil isleme</p>
            </div>
          </div>
          <PDFDownload title="NLP" sheetId="nlp" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SpaCy Temel</h2>

          <CodeBlock
            language="python"
            title="Baslangic"
            code={`import spacy

# Model yukle
nlp = spacy.load("en_core_web_sm")
nlp = spacy.load("tr_core_news_trf")  # Turkce

# Model indir
# python -m spacy download en_core_web_sm

# Doc olustur
doc = nlp("This is a sentence.")

# Token'lar
for token in doc:
    print(token.text, token.pos_, token.dep_)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Token Ozellikleri</h2>

          <CodeBlock
            language="python"
            title="Token Attributes"
            code={`doc = nlp("Apple is looking at buying U.K. startup for $1 billion")

for token in doc:
    print(f"""
    Text: {token.text}
    Lemma: {token.lemma_}
    POS: {token.pos_}
    Tag: {token.tag_}
    Dep: {token.dep_}
    Shape: {token.shape_}
    Is alpha: {token.is_alpha}
    Is stop: {token.is_stop}
    Is punct: {token.is_punct}
    Is digit: {token.is_digit}
    """)

# Lemmatization
for token in doc:
    if token.lemma_ != token.text:
        print(f"{token.text} -> {token.lemma_}")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Named Entity Recognition</h2>

          <CodeBlock
            language="python"
            title="NER"
            code={`doc = nlp("Apple is looking at buying U.K. startup for $1 billion")

# Entity'ler
for ent in doc.ents:
    print(ent.text, ent.start_char, ent.end_char, ent.label_)

# Output:
# Apple 0 5 ORG
# U.K. 27 31 GPE
# $1 billion 44 54 MONEY

# Entity labels
# ORG - Organization
# GPE - Geopolitical entity
# MONEY - Money
# DATE - Date
# TIME - Time
# PERSON - Person name
# LOC - Location
# PRODUCT - Product

# Visualize
from spacy import displacy
displacy.render(doc, style="ent")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dependency Parsing</h2>

          <CodeBlock
            language="python"
            title="Syntactic Dependencies"
            code={`doc = nlp("The quick brown fox jumps over the lazy dog")

# Dependency tree
for token in doc:
    print(f"{token.text} --{token.dep_}--> {token.head.text}")

# Root
root = [token for token in doc if token.head == token][0]

# Children
for token in doc:
    children = [child for child in token.children]
    print(f"{token.text}: {children}")

# Subtree
for token in doc:
    subtree = [t.text for t in token.subtree]
    print(f"{token.text}: {subtree}")

# Visualize
displacy.render(doc, style="dep")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sentence Segmentation</h2>

          <CodeBlock
            language="python"
            title="Cumle Ayirma"
            code={`text = "This is first sentence. This is second. And third!"
doc = nlp(text)

# Cumleler
for sent in doc.sents:
    print(sent.text)

# Cumle sayisi
num_sentences = len(list(doc.sents))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Text Processing</h2>

          <CodeBlock
            language="python"
            title="Preprocessing"
            code={`# Stop words kaldir
doc = nlp("This is a sample sentence showing stop word removal")
filtered = [token for token in doc if not token.is_stop]
print([t.text for t in filtered])

# Punctuation kaldir
no_punct = [token for token in doc if not token.is_punct]

# Lemmatize
lemmas = [token.lemma_ for token in doc]

# Lowercase lemmas (stop words removed)
clean_tokens = [
    token.lemma_.lower()
    for token in doc
    if not token.is_stop and not token.is_punct and token.is_alpha
]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Word Vectors</h2>

          <CodeBlock
            language="python"
            title="Similarity"
            code={`# Medium/large model gerekli
nlp = spacy.load("en_core_web_md")

# Token vectors
doc = nlp("dog cat banana")
for token in doc:
    print(token.text, token.has_vector, token.vector_norm)

# Similarity
doc1 = nlp("I like cats")
doc2 = nlp("I love dogs")
print(doc1.similarity(doc2))

# Token similarity
cat = nlp("cat")
dog = nlp("dog")
print(cat.similarity(dog))

# Most similar
from scipy.spatial.distance import cosine
# Custom similarity hesaplama`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pattern Matching</h2>

          <CodeBlock
            language="python"
            title="Matcher"
            code={`from spacy.matcher import Matcher

nlp = spacy.load("en_core_web_sm")
matcher = Matcher(nlp.vocab)

# Pattern tanimla
pattern = [
    {"LOWER": "hello"},
    {"IS_PUNCT": True},
    {"LOWER": "world"}
]
matcher.add("HelloWorld", [pattern])

doc = nlp("Hello, world! Hello, universe!")
matches = matcher(doc)

for match_id, start, end in matches:
    span = doc[start:end]
    print(span.text)

# Complex patterns
pattern = [
    {"POS": "ADJ", "OP": "?"},  # Optional adjective
    {"POS": "NOUN"}
]

# Token patterns
pattern = [
    {"TEXT": {"REGEX": "^[A-Z]"}},  # Starts with capital
    {"IS_PUNCT": False}
]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">NLTK Temel</h2>

          <CodeBlock
            language="python"
            title="NLTK Islemleri"
            code={`import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

# Tokenization
text = "This is a sample sentence."
words = word_tokenize(text)
sentences = sent_tokenize(text)

# Stop words
stop_words = set(stopwords.words('english'))
filtered = [w for w in words if w.lower() not in stop_words]

# Stemming
stemmer = PorterStemmer()
stems = [stemmer.stem(w) for w in words]

# Lemmatization
lemmatizer = WordNetLemmatizer()
lemmas = [lemmatizer.lemmatize(w) for w in words]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Text Vectorization</h2>

          <CodeBlock
            language="python"
            title="TF-IDF ve Count"
            code={`from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

documents = [
    "This is the first document.",
    "This document is the second document.",
    "And this is the third one."
]

# Count Vectorizer (Bag of Words)
count_vec = CountVectorizer()
count_matrix = count_vec.fit_transform(documents)
print(count_vec.get_feature_names_out())

# TF-IDF
tfidf_vec = TfidfVectorizer()
tfidf_matrix = tfidf_vec.fit_transform(documents)

# Parameters
tfidf_vec = TfidfVectorizer(
    max_features=1000,
    min_df=2,
    max_df=0.8,
    ngram_range=(1, 2),
    stop_words='english'
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sentiment Analysis</h2>

          <CodeBlock
            language="python"
            title="TextBlob Sentiment"
            code={`from textblob import TextBlob

text = "I love this product! It's amazing."
blob = TextBlob(text)

# Sentiment
print(blob.sentiment)
# Sentiment(polarity=0.625, subjectivity=0.6)

# Polarity: -1 (negative) to 1 (positive)
# Subjectivity: 0 (objective) to 1 (subjective)

# VADER (for social media)
from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()
scores = sia.polarity_scores(text)
# {'neg': 0.0, 'neu': 0.23, 'pos': 0.77, 'compound': 0.8516}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Custom Pipeline</h2>

          <CodeBlock
            language="python"
            title="SpaCy Pipeline"
            code={`import spacy
from spacy.language import Language

# Custom component
@Language.component("custom_component")
def custom_component(doc):
    # Custom processing
    for token in doc:
        if token.text == "custom":
            token._.custom_attr = True
    return doc

# Add to pipeline
nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("custom_component", last=True)

# Pipeline info
print(nlp.pipe_names)

# Disable components
with nlp.disable_pipes("parser", "ner"):
    doc = nlp("This is faster")

# Process multiple texts
texts = ["First text", "Second text", "Third text"]
docs = list(nlp.pipe(texts, batch_size=50))`}
          />
        </section>
      </div>
    </div>
  )
}
