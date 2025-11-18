'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Layers, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PyTorchCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">PyTorch Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tensor islemleri ve sinir aglari</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tensor Islemleri</h2>

          <CodeBlock
            title="Tensor Olusturma"
            code={`import torch
import numpy as np

# Tensor olusturma
t = torch.tensor([1, 2, 3])
t = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)

# Ozel tensorlar
torch.zeros(3, 4)
torch.ones(2, 3)
torch.full((2, 2), 5)
torch.empty(2, 2)
torch.eye(4)

# Aralik
torch.arange(0, 10, 2)
torch.linspace(0, 1, 5)

# Rastgele
torch.rand(3, 3)        # Uniform [0, 1)
torch.randn(3, 3)       # Normal
torch.randint(0, 10, (3, 3))
torch.manual_seed(42)

# NumPy donusumu
t = torch.from_numpy(np.array([1, 2, 3]))
arr = t.numpy()

# Device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
t = t.to(device)
t = t.cuda()
t = t.cpu()`}
          />

          <CodeBlock
            title="Tensor Islemleri"
            code={`a = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)
b = torch.tensor([[5, 6], [7, 8]], dtype=torch.float32)

# Aritmetik
a + b               # Toplama
a - b               # Cikarma
a * b               # Element-wise carpma
a @ b               # Matris carpimi
torch.mm(a, b)      # Matris carpimi
a / b               # Bolme

# Indirgeme
torch.sum(a)
torch.mean(a)
torch.max(a)
torch.min(a)
torch.sum(a, dim=0)     # Sutun toplami
torch.sum(a, dim=1)     # Satir toplami

# Yeniden sekillendirme
a.view(4, 1)
a.reshape(4, 1)
a.T                     # Transpose
a.transpose(0, 1)
a.unsqueeze(0)          # Boyut ekle
a.squeeze()             # Boyut sil
a.flatten()

# Birlestirme
torch.cat([a, b], dim=0)
torch.stack([a, b], dim=0)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Autograd</h2>

          <CodeBlock
            title="Otomatik Turev"
            code={`# requires_grad ile tensor
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x + 1

# Backward
y.backward()
print(x.grad)  # dy/dx = 2x + 3 = 7

# Gradient temizleme
x.grad.zero_()

# No gradient
with torch.no_grad():
    y = x * 2  # Gradient hesaplanmaz

# Detach
y = x.detach()  # Gradient takibinden cikar

# Gradient accumulation
for i in range(3):
    y = x ** 2
    y.backward()
    print(x.grad)  # Birikir!
    x.grad.zero_()  # Temizle`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Neural Network</h2>

          <CodeBlock
            title="nn.Module ile Model"
            code={`import torch.nn as nn
import torch.nn.functional as F

# Basit MLP
class MLP(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, num_classes)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

model = MLP(784, 128, 10)
print(model)

# CNN
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.pool = nn.MaxPool2d(2)
        self.fc1 = nn.Linear(64 * 5 * 5, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 5 * 5)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x`}
          />

          <CodeBlock
            title="nn.Sequential"
            code={`# Sequential model
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(64, 10)
)

# OrderedDict ile
from collections import OrderedDict
model = nn.Sequential(OrderedDict([
    ('fc1', nn.Linear(784, 128)),
    ('relu1', nn.ReLU()),
    ('fc2', nn.Linear(128, 10))
]))

# Katmana erisim
model.fc1
model[0]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Egitim Dongusu</h2>

          <CodeBlock
            title="Training Loop"
            code={`import torch.optim as optim

# Model, loss, optimizer
model = MLP(784, 128, 10).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Egitim dongusu
num_epochs = 10
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)

        # Zero gradients
        optimizer.zero_grad()

        # Forward
        outputs = model(inputs)
        loss = criterion(outputs, labels)

        # Backward
        loss.backward()

        # Update weights
        optimizer.step()

        running_loss += loss.item()

    # Epoch loss
    epoch_loss = running_loss / len(train_loader)
    print(f'Epoch {epoch+1}/{num_epochs}, Loss: {epoch_loss:.4f}')`}
          />

          <CodeBlock
            title="Validation ve Test"
            code={`# Validation
model.eval()
val_loss = 0.0
correct = 0
total = 0

with torch.no_grad():
    for inputs, labels in val_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        val_loss += loss.item()

        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

accuracy = 100 * correct / total
print(f'Validation Accuracy: {accuracy:.2f}%')

# Tek ornek tahmin
model.eval()
with torch.no_grad():
    sample = test_data[0].unsqueeze(0).to(device)
    output = model(sample)
    pred = output.argmax(dim=1).item()
    print(f'Predicted: {pred}')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DataLoader</h2>

          <CodeBlock
            title="Dataset ve DataLoader"
            code={`from torch.utils.data import Dataset, DataLoader, random_split

# Custom Dataset
class MyDataset(Dataset):
    def __init__(self, X, y, transform=None):
        self.X = X
        self.y = y
        self.transform = transform

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        sample = self.X[idx]
        label = self.y[idx]
        if self.transform:
            sample = self.transform(sample)
        return sample, label

# DataLoader
dataset = MyDataset(X, y)
train_loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,
    pin_memory=True
)

# Train/val split
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

# Built-in datasets
from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

train_dataset = datasets.MNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Optimizer ve Scheduler</h2>

          <CodeBlock
            title="Optimizer Secenekleri"
            code={`import torch.optim as optim

# Optimizer cesitleri
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
optimizer = optim.Adam(model.parameters(), lr=0.001)
optimizer = optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)
optimizer = optim.RMSprop(model.parameters(), lr=0.001)

# Learning rate scheduler
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)
scheduler = optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)
scheduler = optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', factor=0.5, patience=5
)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100)

# Egitim dongusunde
for epoch in range(num_epochs):
    train_one_epoch()
    scheduler.step()  # Her epoch sonunda
    # veya
    scheduler.step(val_loss)  # ReduceLROnPlateau icin`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Model Kaydetme</h2>

          <CodeBlock
            title="Save ve Load"
            code={`# Sadece state_dict kaydet (onerilen)
torch.save(model.state_dict(), 'model.pth')

# Yukle
model = MLP(784, 128, 10)
model.load_state_dict(torch.load('model.pth'))
model.eval()

# Tum modeli kaydet
torch.save(model, 'full_model.pth')
model = torch.load('full_model.pth')

# Checkpoint kaydet
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}
torch.save(checkpoint, 'checkpoint.pth')

# Checkpoint yukle
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Loss Functions</h2>

          <CodeBlock
            title="Kayip Fonksiyonlari"
            code={`# Classification
nn.CrossEntropyLoss()           # Multi-class (logits)
nn.NLLLoss()                    # Multi-class (log probabilities)
nn.BCELoss()                    # Binary (probabilities)
nn.BCEWithLogitsLoss()          # Binary (logits)

# Regression
nn.MSELoss()                    # Mean Squared Error
nn.L1Loss()                     # Mean Absolute Error
nn.SmoothL1Loss()               # Huber Loss

# Ornek kullanim
criterion = nn.CrossEntropyLoss()
loss = criterion(outputs, labels)  # labels: class indices

criterion = nn.BCEWithLogitsLoss()
loss = criterion(outputs, labels.float())  # labels: 0 or 1`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transfer Learning</h2>

          <CodeBlock
            title="Pre-trained Modeller"
            code={`from torchvision import models

# Pre-trained model yukle
model = models.resnet50(pretrained=True)

# Son katmani degistir
num_classes = 10
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Agirliklari dondur
for param in model.parameters():
    param.requires_grad = False

# Son katmani egit
for param in model.fc.parameters():
    param.requires_grad = True

# Fine-tuning
# Sadece son birkac katmani egit
for name, param in model.named_parameters():
    if 'layer4' in name or 'fc' in name:
        param.requires_grad = True
    else:
        param.requires_grad = False

# Farkli learning rate
optimizer = optim.Adam([
    {'params': model.fc.parameters(), 'lr': 1e-3},
    {'params': model.layer4.parameters(), 'lr': 1e-4}
])`}
          />
        </section>
      </div>
    </div>
  )
}
