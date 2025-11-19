'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Brain, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function KerasCheatSheet() {
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
            <div className="p-3 rounded-xl bg-red-600">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Keras Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Deep learning API</p>
            </div>
          </div>
          <PDFDownload title="Keras" sheetId="keras" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sequential Model</h2>

          <CodeBlock
            language="python"
            title="Model Olusturma"
            code={`from tensorflow import keras
from tensorflow.keras import layers

# Sequential API
model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Add ile
model = keras.Sequential()
model.add(layers.Dense(128, activation='relu', input_shape=(784,)))
model.add(layers.Dropout(0.2))
model.add(layers.Dense(10, activation='softmax'))

# Model ozeti
model.summary()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Functional API</h2>

          <CodeBlock
            language="python"
            title="Functional Model"
            code={`from tensorflow.keras import Model, Input

# Functional API
inputs = Input(shape=(784,))
x = layers.Dense(128, activation='relu')(inputs)
x = layers.Dropout(0.2)(x)
x = layers.Dense(64, activation='relu')(x)
outputs = layers.Dense(10, activation='softmax')(x)

model = Model(inputs=inputs, outputs=outputs)

# Multiple inputs
input1 = Input(shape=(32,), name='input1')
input2 = Input(shape=(32,), name='input2')
x = layers.concatenate([input1, input2])
x = layers.Dense(64, activation='relu')(x)
outputs = layers.Dense(1, activation='sigmoid')(x)

model = Model(inputs=[input1, input2], outputs=outputs)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Compile ve Fit</h2>

          <CodeBlock
            language="python"
            title="Model Egitimi"
            code={`# Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Custom optimizer
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss=keras.losses.SparseCategoricalCrossentropy(),
    metrics=[keras.metrics.SparseCategoricalAccuracy()]
)

# Fit
history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Validation data ile
history = model.fit(
    x_train, y_train,
    epochs=10,
    validation_data=(x_val, y_val)
)

# History
print(history.history['loss'])
print(history.history['val_accuracy'])`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Layers</h2>

          <CodeBlock
            language="python"
            title="Common Layers"
            code={`# Dense (fully connected)
layers.Dense(64, activation='relu')
layers.Dense(10, activation='softmax')

# Convolutional
layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1))
layers.MaxPooling2D((2, 2))
layers.Conv2D(64, (3, 3), activation='relu')
layers.Flatten()

# Recurrent
layers.LSTM(128, return_sequences=True)
layers.GRU(64)
layers.SimpleRNN(32)
layers.Bidirectional(layers.LSTM(64))

# Regularization
layers.Dropout(0.5)
layers.BatchNormalization()

# Embedding
layers.Embedding(vocab_size, embedding_dim, input_length=max_length)

# Reshape
layers.Flatten()
layers.Reshape((7, 7, 64))`}
          />

          <CodeBlock
            language="python"
            title="Activation Functions"
            code={`# Activation layer
layers.Activation('relu')

# Activation parameter
layers.Dense(64, activation='relu')

# Activations
'relu'          # ReLU
'sigmoid'       # Sigmoid
'softmax'       # Softmax
'tanh'          # Tanh
'softplus'      # Softplus
'selu'          # SELU
'elu'           # ELU
'leaky_relu'    # Leaky ReLU`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CNN Model</h2>

          <CodeBlock
            language="python"
            title="Image Classification"
            code={`model = keras.Sequential([
    # Conv block 1
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),

    # Conv block 2
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),

    # Conv block 3
    layers.Conv2D(64, (3, 3), activation='relu'),

    # Dense
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Callbacks</h2>

          <CodeBlock
            language="python"
            title="Training Callbacks"
            code={`from tensorflow.keras.callbacks import (
    EarlyStopping, ModelCheckpoint, ReduceLROnPlateau, TensorBoard
)

# Early stopping
early_stop = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

# Model checkpoint
checkpoint = ModelCheckpoint(
    'best_model.keras',
    monitor='val_accuracy',
    save_best_only=True
)

# Learning rate reduction
reduce_lr = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=3,
    min_lr=0.0001
)

# TensorBoard
tensorboard = TensorBoard(log_dir='./logs')

# Fit with callbacks
model.fit(
    x_train, y_train,
    epochs=50,
    validation_split=0.2,
    callbacks=[early_stop, checkpoint, reduce_lr]
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Evaluate ve Predict</h2>

          <CodeBlock
            language="python"
            title="Model Kullanimi"
            code={`# Evaluate
loss, accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f'Test accuracy: {accuracy:.4f}')

# Predict
predictions = model.predict(x_test)
predicted_classes = predictions.argmax(axis=1)

# Single prediction
single_pred = model.predict(x_test[:1])

# Predict probabilities
probs = model.predict(x_test)
print(probs[0])  # Class probabilities`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Save ve Load</h2>

          <CodeBlock
            language="python"
            title="Model Kaydetme"
            code={`# Save entire model
model.save('my_model.keras')
model.save('my_model.h5')

# Load model
model = keras.models.load_model('my_model.keras')

# Save weights only
model.save_weights('weights.h5')
model.load_weights('weights.h5')

# Save architecture only
json_config = model.to_json()
with open('model_config.json', 'w') as f:
    f.write(json_config)

# Load architecture
with open('model_config.json') as f:
    json_config = f.read()
model = keras.models.model_from_json(json_config)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Data Augmentation</h2>

          <CodeBlock
            language="python"
            title="Image Augmentation"
            code={`from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Data generator
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    shear_range=0.2
)

# Fit on training data
datagen.fit(x_train)

# Fit with generator
model.fit(
    datagen.flow(x_train, y_train, batch_size=32),
    epochs=50,
    validation_data=(x_val, y_val)
)

# Load from directory
train_generator = datagen.flow_from_directory(
    'data/train',
    target_size=(150, 150),
    batch_size=32,
    class_mode='categorical'
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transfer Learning</h2>

          <CodeBlock
            language="python"
            title="Pre-trained Models"
            code={`from tensorflow.keras.applications import VGG16, ResNet50

# Load pre-trained model
base_model = VGG16(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Freeze base model
base_model.trainable = False

# Add custom layers
model = keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

# Fine-tuning
base_model.trainable = True
for layer in base_model.layers[:-4]:
    layer.trainable = False

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`}
          />
        </section>
      </div>
    </div>
  )
}
