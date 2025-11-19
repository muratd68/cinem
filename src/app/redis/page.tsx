'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function RedisCheatSheet() {
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
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Redis Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>In-memory database</p>
            </div>
          </div>
          <PDFDownload title="Redis" sheetId="redis" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">String</h2>

          <CodeBlock
            language="bash"
            title="String Komutlari"
            code={`# Set/Get
SET key "value"
GET key

# Multiple
MSET key1 "val1" key2 "val2"
MGET key1 key2

# Set with expiration
SET key "value" EX 3600      # saniye
SET key "value" PX 3600000   # milisaniye
SETEX key 3600 "value"

# Set if not exists
SETNX key "value"
SET key "value" NX

# Increment/Decrement
INCR counter
INCRBY counter 5
DECR counter
DECRBY counter 5
INCRBYFLOAT price 0.5

# Append
APPEND key "more"

# String length
STRLEN key

# Get range
GETRANGE key 0 4`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hash</h2>

          <CodeBlock
            language="bash"
            title="Hash Komutlari"
            code={`# Set field
HSET user:1 name "Ali" age 25
HMSET user:1 name "Ali" age 25 city "Istanbul"

# Get field
HGET user:1 name
HMGET user:1 name age
HGETALL user:1

# Check field exists
HEXISTS user:1 name

# Delete field
HDEL user:1 age

# Get all keys/values
HKEYS user:1
HVALS user:1

# Field count
HLEN user:1

# Increment field
HINCRBY user:1 age 1
HINCRBYFLOAT user:1 score 0.5

# Set if not exists
HSETNX user:1 email "ali@mail.com"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">List</h2>

          <CodeBlock
            language="bash"
            title="List Komutlari"
            code={`# Push
LPUSH mylist "a"          # Basa ekle
RPUSH mylist "b"          # Sona ekle

# Pop
LPOP mylist               # Bastan al
RPOP mylist               # Sondan al

# Blocking pop
BLPOP mylist 30           # 30 saniye bekle
BRPOP mylist 30

# Get by index
LINDEX mylist 0

# Get range
LRANGE mylist 0 -1        # Tumu
LRANGE mylist 0 9         # Ilk 10

# List length
LLEN mylist

# Set by index
LSET mylist 0 "new"

# Insert
LINSERT mylist BEFORE "b" "a"
LINSERT mylist AFTER "a" "b"

# Remove
LREM mylist 2 "a"         # 2 adet "a" sil

# Trim
LTRIM mylist 0 99         # Sadece ilk 100`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Set</h2>

          <CodeBlock
            language="bash"
            title="Set Komutlari"
            code={`# Add
SADD myset "a" "b" "c"

# Members
SMEMBERS myset

# Check member
SISMEMBER myset "a"

# Remove
SREM myset "a"

# Set size
SCARD myset

# Random member
SRANDMEMBER myset
SRANDMEMBER myset 3       # 3 random

# Pop random
SPOP myset

# Set operations
SUNION set1 set2          # Birlesim
SINTER set1 set2          # Kesisim
SDIFF set1 set2           # Fark

# Store result
SUNIONSTORE destset set1 set2
SINTERSTORE destset set1 set2

# Move member
SMOVE srcset dstset "member"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sorted Set</h2>

          <CodeBlock
            language="bash"
            title="Sorted Set Komutlari"
            code={`# Add with score
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2" 150 "player3"

# Get by rank (score sirali)
ZRANGE leaderboard 0 -1              # Kucukten buyuge
ZREVRANGE leaderboard 0 -1           # Buyukten kucuge
ZRANGE leaderboard 0 -1 WITHSCORES

# Get by score
ZRANGEBYSCORE leaderboard 100 200
ZRANGEBYSCORE leaderboard -inf +inf

# Get rank
ZRANK leaderboard "player1"          # 0-based
ZREVRANK leaderboard "player1"

# Get score
ZSCORE leaderboard "player1"

# Increment score
ZINCRBY leaderboard 50 "player1"

# Count
ZCARD leaderboard
ZCOUNT leaderboard 100 200

# Remove
ZREM leaderboard "player1"
ZREMRANGEBYRANK leaderboard 0 2
ZREMRANGEBYSCORE leaderboard 0 100`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Keys ve Expiration</h2>

          <CodeBlock
            language="bash"
            title="Key Islemleri"
            code={`# Key listele
KEYS *
KEYS user:*
SCAN 0 MATCH user:* COUNT 100

# Key varmi
EXISTS key

# Key sil
DEL key
UNLINK key               # Async delete

# Key tipi
TYPE key

# Rename
RENAME oldkey newkey
RENAMENX oldkey newkey   # Only if not exists

# Expiration
EXPIRE key 3600          # Saniye
PEXPIRE key 3600000      # Milisaniye
EXPIREAT key 1700000000  # Unix timestamp

# TTL kontrol
TTL key                  # Saniye
PTTL key                 # Milisaniye

# Expiration kaldir
PERSIST key

# Key database tasima
MOVE key 1               # DB 1'e tasi`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pub/Sub</h2>

          <CodeBlock
            language="bash"
            title="Pub/Sub"
            code={`# Subscribe
SUBSCRIBE channel1 channel2
PSUBSCRIBE news:*        # Pattern subscribe

# Publish
PUBLISH channel1 "message"

# Unsubscribe
UNSUBSCRIBE channel1
PUNSUBSCRIBE news:*

# Active channels
PUBSUB CHANNELS
PUBSUB NUMSUB channel1`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transactions</h2>

          <CodeBlock
            language="bash"
            title="Multi/Exec"
            code={`# Transaction baslat
MULTI
SET key1 "val1"
INCR counter
EXEC

# Iptal
MULTI
SET key1 "val1"
DISCARD

# Watch (optimistic locking)
WATCH mykey
MULTI
SET mykey "newvalue"
EXEC
# Baska client mykey degistirdiyse EXEC nil doner`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python ile Redis</h2>

          <CodeBlock
            language="python"
            title="redis-py"
            code={`import redis

# Baglanti
r = redis.Redis(host='localhost', port=6379, db=0)

# String
r.set('key', 'value')
r.get('key')
r.setex('key', 3600, 'value')  # With expiration

# Hash
r.hset('user:1', 'name', 'Ali')
r.hset('user:1', mapping={'age': 25, 'city': 'Istanbul'})
r.hget('user:1', 'name')
r.hgetall('user:1')

# List
r.lpush('mylist', 'a', 'b')
r.rpush('mylist', 'c')
r.lrange('mylist', 0, -1)

# Set
r.sadd('myset', 'a', 'b', 'c')
r.smembers('myset')

# Sorted Set
r.zadd('leaderboard', {'player1': 100, 'player2': 200})
r.zrange('leaderboard', 0, -1, withscores=True)

# Pipeline (batch)
pipe = r.pipeline()
pipe.set('key1', 'val1')
pipe.set('key2', 'val2')
pipe.execute()`}
          />
        </section>
      </div>
    </div>
  )
}
