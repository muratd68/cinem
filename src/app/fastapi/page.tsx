'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function FastAPICheatSheet() {
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
            <div className="p-3 rounded-xl bg-teal-500">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">FastAPI Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Modern Python API framework</p>
            </div>
          </div>
          <PDFDownload title="FastAPI" sheetId="fastapi" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Yapi</h2>

          <CodeBlock
            title="Baslangic"
            code={`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# Calistir: uvicorn main:app --reload`}
          />

          <CodeBlock
            title="HTTP Methods"
            code={`from fastapi import FastAPI

app = FastAPI()

@app.get("/items")
def get_items():
    return []

@app.post("/items")
def create_item(item: dict):
    return item

@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    return {"item_id": item_id, **item}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"deleted": item_id}

@app.patch("/items/{item_id}")
def patch_item(item_id: int, item: dict):
    return {"item_id": item_id, **item}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Path ve Query Parameters</h2>

          <CodeBlock
            title="Parameters"
            code={`from fastapi import FastAPI, Query, Path
from typing import Optional

app = FastAPI()

# Path parameter
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}

# Query parameter
@app.get("/items")
def get_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

# Optional query
@app.get("/search")
def search(q: Optional[str] = None):
    return {"query": q}

# Validation
@app.get("/items/{item_id}")
def get_item(
    item_id: int = Path(..., gt=0, le=1000),
    q: str = Query(None, min_length=3, max_length=50)
):
    return {"item_id": item_id, "q": q}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pydantic Models</h2>

          <CodeBlock
            title="Request/Response Models"
            code={`from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

app = FastAPI()

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    description: Optional[str] = None
    tags: List[str] = []

class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    created_at: datetime

    class Config:
        orm_mode = True

class User(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

@app.post("/items", response_model=ItemResponse)
def create_item(item: ItemCreate):
    return {
        "id": 1,
        "name": item.name,
        "price": item.price,
        "created_at": datetime.now()
    }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dependency Injection</h2>

          <CodeBlock
            title="Dependencies"
            code={`from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

# Basit dependency
def get_db():
    db = Database()
    try:
        yield db
    finally:
        db.close()

@app.get("/items")
def get_items(db = Depends(get_db)):
    return db.get_all()

# Auth dependency
def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/users/me")
def get_me(user = Depends(get_current_user)):
    return user

# Class dependency
class Pagination:
    def __init__(self, skip: int = 0, limit: int = 10):
        self.skip = skip
        self.limit = limit

@app.get("/items")
def get_items(pagination: Pagination = Depends()):
    return {"skip": pagination.skip, "limit": pagination.limit}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Error Handling</h2>

          <CodeBlock
            title="Exceptions"
            code={`from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

# HTTPException
@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(
            status_code=404,
            detail="Item not found",
            headers={"X-Error": "Item missing"}
        )
    return items[item_id]

# Custom exception
class ItemNotFound(Exception):
    def __init__(self, item_id: int):
        self.item_id = item_id

@app.exception_handler(ItemNotFound)
def item_not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": f"Item {exc.item_id} not found"}
    )`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Middleware</h2>

          <CodeBlock
            title="Middleware"
            code={`from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware
@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Background Tasks</h2>

          <CodeBlock
            title="Background Tasks"
            code={`from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def write_log(message: str):
    with open("log.txt", "a") as f:
        f.write(message)

def send_email(email: str, message: str):
    # Email gonderme islemi
    pass

@app.post("/send-notification")
async def send_notification(
    email: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email, email, "Hello!")
    background_tasks.add_task(write_log, f"Email sent to {email}")
    return {"message": "Notification sent"}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">File Upload</h2>

          <CodeBlock
            title="File Operations"
            code={`from fastapi import FastAPI, File, UploadFile
from typing import List

app = FastAPI()

# Tek dosya
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents)
    }

# Coklu dosya
@app.post("/upload-multiple")
async def upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [f.filename for f in files]}

# Dosya kaydet
@app.post("/save")
async def save_file(file: UploadFile = File(...)):
    with open(f"uploads/{file.filename}", "wb") as f:
        contents = await file.read()
        f.write(contents)
    return {"saved": file.filename}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Authentication</h2>

          <CodeBlock
            title="JWT Auth"
            code={`from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "secret"
ALGORITHM = "HS256"

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(hours=24)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/token")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    # Kullanici dogrula
    if form.username != "admin":
        raise HTTPException(status_code=401)
    token = create_token({"sub": form.username})
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401)

@app.get("/users/me")
async def read_me(user: str = Depends(get_current_user)):
    return {"user": user}`}
          />
        </section>
      </div>
    </div>
  )
}
