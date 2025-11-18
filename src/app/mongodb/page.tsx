'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function MongoDBCheatSheet() {
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
            <div className="p-3 rounded-xl bg-green-500">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">MongoDB Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>NoSQL veritabani</p>
            </div>
          </div>
          <PDFDownload title="MongoDB" sheetId="mongodb" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="javascript"
            title="Database ve Collection"
            code={`// Database listele
show dbs

// Database sec
use mydb

// Collection listele
show collections

// Collection olustur
db.createCollection("users")

// Collection sil
db.users.drop()

// Database sil
db.dropDatabase()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CRUD Islemleri</h2>

          <CodeBlock
            language="javascript"
            title="Insert"
            code={`// Tek dokuman ekle
db.users.insertOne({
  name: "Ali",
  age: 25,
  email: "ali@mail.com"
})

// Birden fazla dokuman
db.users.insertMany([
  { name: "Veli", age: 30 },
  { name: "Ayse", age: 28 }
])`}
          />

          <CodeBlock
            language="javascript"
            title="Find (Read)"
            code={`// Tum dokumanlar
db.users.find()

// Guzellestir
db.users.find().pretty()

// Kosul ile
db.users.find({ age: 25 })
db.users.find({ age: { $gt: 25 } })

// Tek dokuman
db.users.findOne({ name: "Ali" })

// Projeksiyon (alan secimi)
db.users.find({}, { name: 1, age: 1, _id: 0 })

// Limit ve skip
db.users.find().limit(10)
db.users.find().skip(5).limit(10)

// Siralama
db.users.find().sort({ age: 1 })   // ASC
db.users.find().sort({ age: -1 })  // DESC

// Count
db.users.countDocuments({ age: { $gt: 25 } })`}
          />

          <CodeBlock
            language="javascript"
            title="Update"
            code={`// Tek dokuman guncelle
db.users.updateOne(
  { name: "Ali" },
  { $set: { age: 26 } }
)

// Tum eslesen
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
)

// Upsert (yoksa ekle)
db.users.updateOne(
  { name: "Mehmet" },
  { $set: { age: 35 } },
  { upsert: true }
)

// Replace
db.users.replaceOne(
  { name: "Ali" },
  { name: "Ali", age: 27, city: "Ankara" }
)`}
          />

          <CodeBlock
            language="javascript"
            title="Delete"
            code={`// Tek dokuman sil
db.users.deleteOne({ name: "Ali" })

// Tum eslesen
db.users.deleteMany({ age: { $lt: 20 } })

// Tumu sil
db.users.deleteMany({})`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Query Operatorleri</h2>

          <CodeBlock
            language="javascript"
            title="Karsilastirma Operatorleri"
            code={`// Esitlik
{ age: 25 }
{ age: { $eq: 25 } }

// Esit degil
{ age: { $ne: 25 } }

// Buyuk/kucuk
{ age: { $gt: 25 } }   // >
{ age: { $gte: 25 } }  // >=
{ age: { $lt: 25 } }   // <
{ age: { $lte: 25 } }  // <=

// In/Not in
{ age: { $in: [25, 30, 35] } }
{ age: { $nin: [25, 30] } }

// Exists
{ email: { $exists: true } }`}
          />

          <CodeBlock
            language="javascript"
            title="Mantiksal Operatorler"
            code={`// AND
db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { age: { $lt: 30 } }
  ]
})

// Implicit AND
db.users.find({
  age: { $gt: 20, $lt: 30 }
})

// OR
db.users.find({
  $or: [
    { age: { $lt: 20 } },
    { age: { $gt: 50 } }
  ]
})

// NOT
db.users.find({
  age: { $not: { $gt: 25 } }
})

// NOR
db.users.find({
  $nor: [
    { age: 25 },
    { name: "Ali" }
  ]
})`}
          />

          <CodeBlock
            language="javascript"
            title="Array Operatorleri"
            code={`// Eleman iceriyor mu
db.users.find({ tags: "python" })

// Tum elemanlar
db.users.find({ tags: { $all: ["python", "javascript"] } })

// Array boyutu
db.users.find({ tags: { $size: 3 } })

// Elematch
db.users.find({
  scores: { $elemMatch: { $gt: 80, $lt: 90 } }
})`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Update Operatorleri</h2>

          <CodeBlock
            language="javascript"
            title="Field Operatorleri"
            code={`// Set
{ $set: { name: "Yeni" } }

// Unset (alan sil)
{ $unset: { age: "" } }

// Increment
{ $inc: { age: 1 } }
{ $inc: { score: -5 } }

// Multiply
{ $mul: { price: 1.1 } }

// Rename
{ $rename: { "name": "fullName" } }

// Min/Max
{ $min: { age: 18 } }  // Sadece kucukse guncelle
{ $max: { age: 65 } }  // Sadece buyukse guncelle`}
          />

          <CodeBlock
            language="javascript"
            title="Array Operatorleri"
            code={`// Push (eleman ekle)
{ $push: { tags: "mongodb" } }

// Push multiple
{ $push: { tags: { $each: ["a", "b"] } } }

// Pull (eleman sil)
{ $pull: { tags: "old" } }

// Pull multiple
{ $pullAll: { tags: ["a", "b"] } }

// Pop
{ $pop: { tags: 1 } }   // Sondan
{ $pop: { tags: -1 } }  // Bastan

// AddToSet (benzersiz ekle)
{ $addToSet: { tags: "unique" } }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Aggregation</h2>

          <CodeBlock
            language="javascript"
            title="Aggregation Pipeline"
            code={`db.orders.aggregate([
  // Match (filtreleme)
  { $match: { status: "completed" } },

  // Group
  { $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      count: { $sum: 1 },
      avgAmount: { $avg: "$amount" }
  }},

  // Sort
  { $sort: { totalAmount: -1 } },

  // Limit
  { $limit: 10 },

  // Project
  { $project: {
      customerId: "$_id",
      totalAmount: 1,
      _id: 0
  }}
])`}
          />

          <CodeBlock
            language="javascript"
            title="Aggregation Stages"
            code={`// Lookup (join)
{ $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "orders"
}}

// Unwind (array ac)
{ $unwind: "$tags" }

// AddFields
{ $addFields: {
    total: { $add: ["$price", "$tax"] }
}}

// Count
{ $count: "totalCount" }

// Skip
{ $skip: 10 }

// Out (sonucu kaydet)
{ $out: "newCollection" }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Index</h2>

          <CodeBlock
            language="javascript"
            title="Index Islemleri"
            code={`// Index olustur
db.users.createIndex({ email: 1 })
db.users.createIndex({ name: 1, age: -1 })

// Unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Text index
db.articles.createIndex({ content: "text" })

// Index listele
db.users.getIndexes()

// Index sil
db.users.dropIndex("email_1")

// Text search
db.articles.find({ $text: { $search: "mongodb" } })`}
          />
        </section>
      </div>
    </div>
  )
}
