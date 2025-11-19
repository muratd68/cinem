'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Brain, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function HuggingFaceCheatSheet() {
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
            <div className="p-3 rounded-xl bg-yellow-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Hugging Face Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Transformers, NLP models</p>
            </div>
          </div>
          <PDFDownload title="Hugging Face" sheetId="huggingface" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kurulum ve Temel Kullanım</h2>

          <CodeBlock
            language="bash"
            title="Kurulum"
            code={`# Temel kurulum
pip install transformers

# Tüm özellikler
pip install transformers[torch]
pip install transformers[tf-cpu]
pip install transformers[flax]

# Datasets ve tokenizers
pip install datasets tokenizers

# Accelerate (distributed training)
pip install accelerate`}
          />

          <CodeBlock
            language="python"
            title="Pipeline - Hızlı Başlangıç"
            code={`from transformers import pipeline

# Sentiment Analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.9998}]

# Text Generation
generator = pipeline("text-generation", model="gpt2")
result = generator("Once upon a time", max_length=50)

# Question Answering
qa = pipeline("question-answering")
result = qa(
    question="What is the capital of France?",
    context="France is a country in Europe. Paris is the capital of France."
)

# Named Entity Recognition
ner = pipeline("ner", grouped_entities=True)
result = ner("Hugging Face is based in New York City.")

# Summarization
summarizer = pipeline("summarization")
result = summarizer(long_text, max_length=130, min_length=30)

# Translation
translator = pipeline("translation_en_to_fr")
result = translator("Hello, how are you?")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model ve Tokenizer</h2>

          <CodeBlock
            language="python"
            title="Model Yükleme"
            code={`from transformers import AutoModel, AutoTokenizer, AutoModelForSequenceClassification

# Auto classes (önerilen)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")

# Specific task models
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

# Belirli model sınıfı
from transformers import BertModel, BertTokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")

# Local model
model = AutoModel.from_pretrained("./my_model_directory")

# Model kaydetme
model.save_pretrained("./my_model")
tokenizer.save_pretrained("./my_model")`}
          />

          <CodeBlock
            language="python"
            title="Tokenization"
            code={`from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Basit tokenization
tokens = tokenizer.tokenize("Hello, how are you?")
# ['hello', ',', 'how', 'are', 'you', '?']

# Encoding
encoded = tokenizer("Hello, how are you?")
# {'input_ids': [...], 'attention_mask': [...]}

# Batch encoding
batch = tokenizer(
    ["First sentence", "Second sentence"],
    padding=True,
    truncation=True,
    max_length=512,
    return_tensors="pt"  # "tf" for TensorFlow
)

# Decoding
text = tokenizer.decode(encoded["input_ids"])

# Special tokens
tokenizer.cls_token  # [CLS]
tokenizer.sep_token  # [SEP]
tokenizer.pad_token  # [PAD]
tokenizer.unk_token  # [UNK]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Fine-tuning</h2>

          <CodeBlock
            language="python"
            title="Trainer API"
            code={`from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    TrainingArguments,
    Trainer
)
from datasets import load_dataset

# Dataset yükle
dataset = load_dataset("imdb")

# Tokenizer ve model
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

# Tokenize function
def tokenize_function(examples):
    return tokenizer(
        examples["text"],
        padding="max_length",
        truncation=True,
        max_length=512
    )

# Dataset'i tokenize et
tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
)

# Eğitim
trainer.train()

# Değerlendirme
results = trainer.evaluate()

# Model kaydet
trainer.save_model("./final_model")`}
          />

          <CodeBlock
            language="python"
            title="Custom Training Loop"
            code={`import torch
from torch.utils.data import DataLoader
from transformers import AdamW, get_scheduler

# DataLoader
train_dataloader = DataLoader(
    tokenized_datasets["train"],
    shuffle=True,
    batch_size=8
)

# Optimizer
optimizer = AdamW(model.parameters(), lr=5e-5)

# Scheduler
num_epochs = 3
num_training_steps = num_epochs * len(train_dataloader)
lr_scheduler = get_scheduler(
    "linear",
    optimizer=optimizer,
    num_warmup_steps=0,
    num_training_steps=num_training_steps
)

# Training loop
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

model.train()
for epoch in range(num_epochs):
    for batch in train_dataloader:
        batch = {k: v.to(device) for k, v in batch.items()}
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()

        optimizer.step()
        lr_scheduler.step()
        optimizer.zero_grad()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Datasets</h2>

          <CodeBlock
            language="python"
            title="Dataset İşlemleri"
            code={`from datasets import load_dataset, Dataset, DatasetDict

# Hub'dan yükle
dataset = load_dataset("squad")
dataset = load_dataset("glue", "mrpc")  # Subset

# Local dosyadan
dataset = load_dataset("csv", data_files="data.csv")
dataset = load_dataset("json", data_files="data.json")

# Dictionary'den
data = {
    "text": ["Hello", "World"],
    "label": [0, 1]
}
dataset = Dataset.from_dict(data)

# Pandas'tan
import pandas as pd
df = pd.DataFrame(data)
dataset = Dataset.from_pandas(df)

# Dataset bilgisi
print(dataset)
print(dataset.features)
print(dataset.column_names)

# Erişim
print(dataset[0])  # İlk örnek
print(dataset["text"])  # Tüm text sütunu
print(dataset[0:5])  # İlk 5 örnek

# Map fonksiyonu
def preprocess(example):
    example["text"] = example["text"].lower()
    return example

dataset = dataset.map(preprocess)

# Batched map
dataset = dataset.map(tokenize_function, batched=True)

# Filter
dataset = dataset.filter(lambda x: len(x["text"]) > 10)

# Sort
dataset = dataset.sort("label")

# Shuffle
dataset = dataset.shuffle(seed=42)

# Train/test split
dataset = dataset.train_test_split(test_size=0.2)

# Select columns
dataset = dataset.select_columns(["text", "label"])

# Rename columns
dataset = dataset.rename_column("text", "sentence")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Popüler Modeller</h2>

          <CodeBlock
            language="python"
            title="BERT Modelleri"
            code={`# BERT
from transformers import BertModel, BertTokenizer
model = BertModel.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-large-uncased")

# RoBERTa
from transformers import RobertaModel
model = RobertaModel.from_pretrained("roberta-base")

# DistilBERT (daha hızlı)
from transformers import DistilBertModel
model = DistilBertModel.from_pretrained("distilbert-base-uncased")

# ALBERT
from transformers import AlbertModel
model = AlbertModel.from_pretrained("albert-base-v2")`}
          />

          <CodeBlock
            language="python"
            title="GPT ve Text Generation"
            code={`# GPT-2
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

input_ids = tokenizer.encode("Hello, I am", return_tensors="pt")
output = model.generate(
    input_ids,
    max_length=50,
    num_return_sequences=1,
    temperature=0.7,
    top_k=50,
    top_p=0.95,
    do_sample=True,
    pad_token_id=tokenizer.eos_token_id
)
text = tokenizer.decode(output[0], skip_special_tokens=True)

# GPT-Neo / GPT-J (açık kaynak alternatifler)
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-1.3B")`}
          />

          <CodeBlock
            language="python"
            title="T5 ve Seq2Seq"
            code={`from transformers import T5ForConditionalGeneration, T5Tokenizer

tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# Summarization
input_text = "summarize: " + long_text
input_ids = tokenizer.encode(input_text, return_tensors="pt")
output = model.generate(input_ids, max_length=150)
summary = tokenizer.decode(output[0], skip_special_tokens=True)

# Translation
input_text = "translate English to French: Hello, how are you?"
input_ids = tokenizer.encode(input_text, return_tensors="pt")
output = model.generate(input_ids)
translation = tokenizer.decode(output[0], skip_special_tokens=True)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Inference Optimizasyonu</h2>

          <CodeBlock
            language="python"
            title="Optimizasyon Teknikleri"
            code={`# FP16 (Half precision)
model = AutoModel.from_pretrained("bert-base-uncased", torch_dtype=torch.float16)

# BetterTransformer
model = model.to_bettertransformer()

# Quantization
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_8bit=True,
    # veya load_in_4bit=True
)

model = AutoModelForCausalLM.from_pretrained(
    "bigscience/bloom-7b1",
    quantization_config=quantization_config,
    device_map="auto"
)

# ONNX export
from transformers import convert_graph_to_onnx
convert_graph_to_onnx.convert(
    framework="pt",
    model="bert-base-uncased",
    output="bert.onnx",
    opset=11
)

# Accelerate ile multi-GPU
from accelerate import Accelerator
accelerator = Accelerator()
model, optimizer, dataloader = accelerator.prepare(
    model, optimizer, dataloader
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hub'a Model Yükleme</h2>

          <CodeBlock
            language="python"
            title="Model Paylaşma"
            code={`from huggingface_hub import login, HfApi

# Login
login(token="hf_xxxxx")
# veya: huggingface-cli login

# Model push
model.push_to_hub("username/model-name")
tokenizer.push_to_hub("username/model-name")

# Trainer ile push
trainer.push_to_hub("username/model-name")

# Model card oluştur
from huggingface_hub import ModelCard

card = ModelCard.from_template(
    card_data=ModelCardData(
        language="en",
        license="mit",
        model_name="My Model",
        datasets=["imdb"]
    ),
    template_path="model_card_template.md"
)
card.push_to_hub("username/model-name")`}
          />
        </section>
      </div>
    </div>
  )
}
