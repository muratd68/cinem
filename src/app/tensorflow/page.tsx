'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Cpu, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TensorFlowCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-600">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">TensorFlow Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Derin ogrenme ve sinir aglari</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Islemler</h2>

          <CodeBlock
            title="Tensor Olusturma"
            code={`import tensorflow as tf
import numpy as np

# Sabit tensor
t = tf.constant([1, 2, 3])
t = tf.constant([[1, 2], [3, 4]], dtype=tf.float32)

# Sifir ve birler
tf.zeros([3, 4])
tf.ones([2, 3])
tf.fill([2, 2], 5)

# Aralik
tf.range(10)
tf.linspace(0.0, 1.0, 5)

# Rastgele
tf.random.normal([3, 3], mean=0, stddev=1)
tf.random.uniform([2, 2], minval=0, maxval=1)
tf.random.set_seed(42)

# NumPy'dan
t = tf.constant(np.array([1, 2, 3]))
t.numpy()  # Tensor to NumPy

# Degisken (trainable)
v = tf.Variable([1, 2, 3], dtype=tf.float32)
v.assign([4, 5, 6])
v.assign_add([1, 1, 1])`}
          />

          <CodeBlock
            title="Tensor Islemleri"
            code={`a = tf.constant([[1, 2], [3, 4]], dtype=tf.float32)
b = tf.constant([[5, 6], [7, 8]], dtype=tf.float32)

# Matematiksel islemler
tf.add(a, b)        # a + b
tf.subtract(a, b)   # a - b
tf.multiply(a, b)   # a * b (element-wise)
tf.matmul(a, b)     # a @ b (matris carpimi)
tf.divide(a, b)     # a / b

# Indirgeme
tf.reduce_sum(a)
tf.reduce_mean(a)
tf.reduce_max(a)
tf.reduce_min(a)
tf.reduce_sum(a, axis=0)  # Sutun toplami
tf.reduce_sum(a, axis=1)  # Satir toplami

# Yeniden sekillendirme
tf.reshape(a, [4, 1])
tf.transpose(a)
tf.expand_dims(a, axis=0)
tf.squeeze(a)

# Birlestirme
tf.concat([a, b], axis=0)
tf.stack([a, b], axis=0)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sequential Model</h2>

          <CodeBlock
            title="Model Olusturma"
            code={`from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D

# Basit MLP
model = Sequential([
    Dense(128, activation='relu', input_shape=(784,)),
    Dropout(0.2),
    Dense(64, activation='relu'),
    Dropout(0.2),
    Dense(10, activation='softmax')
])

# CNN
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(10, activation='softmax')
])

# Model ozeti
model.summary()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Functional API</h2>

          <CodeBlock
            title="Fonksiyonel Model"
            code={`from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, concatenate

# Temel model
inputs = Input(shape=(784,))
x = Dense(128, activation='relu')(inputs)
x = Dense(64, activation='relu')(x)
outputs = Dense(10, activation='softmax')(x)
model = Model(inputs=inputs, outputs=outputs)

# Coklu giris
input1 = Input(shape=(10,), name='input1')
input2 = Input(shape=(20,), name='input2')
x1 = Dense(32, activation='relu')(input1)
x2 = Dense(32, activation='relu')(input2)
merged = concatenate([x1, x2])
output = Dense(1, activation='sigmoid')(merged)
model = Model(inputs=[input1, input2], outputs=output)

# Coklu cikis
inputs = Input(shape=(100,))
x = Dense(64, activation='relu')(inputs)
output1 = Dense(10, activation='softmax', name='class')(x)
output2 = Dense(1, activation='linear', name='value')(x)
model = Model(inputs=inputs, outputs=[output1, output2])`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Egitimi</h2>

          <CodeBlock
            title="Compile ve Fit"
            code={`# Model compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Optimizer secenekleri
from tensorflow.keras.optimizers import Adam, SGD, RMSprop
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Loss secenekleri
# binary_crossentropy - Binary classification
# categorical_crossentropy - Multi-class (one-hot)
# sparse_categorical_crossentropy - Multi-class (integer)
# mse - Regression

# Model egitimi
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Validation data ile
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=32,
    validation_data=(X_val, y_val)
)`}
          />

          <CodeBlock
            title="Callbacks"
            code={`from tensorflow.keras.callbacks import (
    EarlyStopping,
    ModelCheckpoint,
    ReduceLROnPlateau,
    TensorBoard
)

# Early stopping
early_stop = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

# Model checkpoint
checkpoint = ModelCheckpoint(
    'best_model.h5',
    monitor='val_accuracy',
    save_best_only=True
)

# Learning rate scheduler
lr_scheduler = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=3,
    min_lr=1e-6
)

# TensorBoard
tensorboard = TensorBoard(log_dir='./logs')

# Callbacks kullanimi
history = model.fit(
    X_train, y_train,
    epochs=100,
    callbacks=[early_stop, checkpoint, lr_scheduler]
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Degerlendirme ve Tahmin</h2>

          <CodeBlock
            title="Evaluate ve Predict"
            code={`# Degerlendirme
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f'Test accuracy: {accuracy:.4f}')

# Tahmin
predictions = model.predict(X_test)
predicted_classes = tf.argmax(predictions, axis=1)

# Tek ornek tahmin
sample = X_test[0:1]
pred = model.predict(sample)

# Egitim gecmisi
import matplotlib.pyplot as plt

plt.plot(history.history['accuracy'], label='train')
plt.plot(history.history['val_accuracy'], label='val')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.show()

plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='val')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.show()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Katmanlar</h2>

          <CodeBlock
            title="Onemli Katmanlar"
            code={`from tensorflow.keras.layers import (
    Dense, Dropout, BatchNormalization,
    Conv2D, MaxPooling2D, AveragePooling2D,
    Flatten, GlobalAveragePooling2D,
    LSTM, GRU, Bidirectional,
    Embedding, Attention
)

# Dense (Fully Connected)
Dense(units=64, activation='relu')

# Dropout
Dropout(rate=0.5)

# Batch Normalization
BatchNormalization()

# Convolution
Conv2D(filters=32, kernel_size=(3, 3), activation='relu', padding='same')

# Pooling
MaxPooling2D(pool_size=(2, 2))
GlobalAveragePooling2D()

# RNN
LSTM(units=64, return_sequences=True)
GRU(units=64)
Bidirectional(LSTM(64))

# Embedding (NLP icin)
Embedding(input_dim=10000, output_dim=128, input_length=100)

# Aktivasyonlar
# 'relu', 'sigmoid', 'tanh', 'softmax', 'leaky_relu'`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Data Pipeline</h2>

          <CodeBlock
            title="tf.data.Dataset"
            code={`# NumPy'dan dataset
dataset = tf.data.Dataset.from_tensor_slices((X, y))

# Pipeline
dataset = dataset.shuffle(buffer_size=1000)
dataset = dataset.batch(32)
dataset = dataset.prefetch(tf.data.AUTOTUNE)

# Zincirleme
dataset = (tf.data.Dataset
    .from_tensor_slices((X, y))
    .shuffle(1000)
    .batch(32)
    .prefetch(tf.data.AUTOTUNE))

# Map ile donusum
def preprocess(x, y):
    x = tf.cast(x, tf.float32) / 255.0
    return x, y

dataset = dataset.map(preprocess)

# Train/test split
train_size = int(0.8 * len(X))
train_dataset = dataset.take(train_size)
test_dataset = dataset.skip(train_size)

# Model ile kullanim
model.fit(train_dataset, epochs=10, validation_data=test_dataset)`}
          />

          <CodeBlock
            title="Image Data Augmentation"
            code={`from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Data augmentation
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    rescale=1./255,
    validation_split=0.2
)

# Klasorden veri yukle
train_generator = datagen.flow_from_directory(
    'data/train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

# Model egitimi
model.fit(
    train_generator,
    epochs=10,
    steps_per_epoch=len(train_generator)
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Kaydetme</h2>

          <CodeBlock
            title="Save ve Load"
            code={`# Tum modeli kaydet
model.save('model.h5')
model.save('model_folder')  # SavedModel format

# Modeli yukle
from tensorflow.keras.models import load_model
model = load_model('model.h5')

# Sadece agirliklari kaydet
model.save_weights('weights.h5')
model.load_weights('weights.h5')

# TensorFlow Lite icin convert
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transfer Learning</h2>

          <CodeBlock
            title="Pre-trained Modeller"
            code={`from tensorflow.keras.applications import (
    VGG16, ResNet50, MobileNetV2, EfficientNetB0
)

# Pre-trained model yukle
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Agirliklari dondur
base_model.trainable = False

# Yeni katmanlar ekle
model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

# Fine-tuning
base_model.trainable = True
for layer in base_model.layers[:-20]:
    layer.trainable = False

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`}
          />
        </section>
      </div>
    </div>
  )
}
