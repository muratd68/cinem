'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function ElasticsearchCheatSheet() {
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
            <div className="p-3 rounded-xl bg-yellow-600">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Elasticsearch Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Search engine</p>
            </div>
          </div>
          <PDFDownload title="Elasticsearch" sheetId="elasticsearch" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cluster ve Index İşlemleri</h2>

          <CodeBlock
            language="bash"
            title="Cluster Bilgisi"
            code={`# Cluster health
GET /_cluster/health

# Cluster stats
GET /_cluster/stats

# Node bilgisi
GET /_nodes
GET /_nodes/stats

# Cat APIs (okunabilir format)
GET /_cat/health?v
GET /_cat/nodes?v
GET /_cat/indices?v
GET /_cat/shards?v`}
          />

          <CodeBlock
            language="bash"
            title="Index İşlemleri"
            code={`# Index oluştur
PUT /my_index
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "date": { "type": "date" },
      "views": { "type": "integer" }
    }
  }
}

# Index bilgisi
GET /my_index
GET /my_index/_settings
GET /my_index/_mapping

# Index sil
DELETE /my_index

# Index aç/kapat
POST /my_index/_close
POST /my_index/_open

# Alias
POST /_aliases
{
  "actions": [
    { "add": { "index": "my_index", "alias": "my_alias" } }
  ]
}

# Reindex
POST /_reindex
{
  "source": { "index": "old_index" },
  "dest": { "index": "new_index" }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Document İşlemleri</h2>

          <CodeBlock
            language="bash"
            title="CRUD İşlemleri"
            code={`# Document ekle (ID ile)
PUT /my_index/_doc/1
{
  "title": "Elasticsearch Guide",
  "date": "2023-01-01",
  "views": 100
}

# Document ekle (otomatik ID)
POST /my_index/_doc
{
  "title": "Another Document",
  "date": "2023-01-02",
  "views": 50
}

# Document al
GET /my_index/_doc/1

# Document güncelle
POST /my_index/_update/1
{
  "doc": {
    "views": 150
  }
}

# Script ile güncelle
POST /my_index/_update/1
{
  "script": {
    "source": "ctx._source.views += params.count",
    "params": { "count": 10 }
  }
}

# Document sil
DELETE /my_index/_doc/1

# Bulk işlemler
POST /_bulk
{ "index": { "_index": "my_index", "_id": "1" } }
{ "title": "Doc 1", "views": 10 }
{ "index": { "_index": "my_index", "_id": "2" } }
{ "title": "Doc 2", "views": 20 }
{ "delete": { "_index": "my_index", "_id": "3" } }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Search Query DSL</h2>

          <CodeBlock
            language="bash"
            title="Temel Sorgular"
            code={`# Match all
GET /my_index/_search
{
  "query": {
    "match_all": {}
  }
}

# Match query
GET /my_index/_search
{
  "query": {
    "match": {
      "title": "elasticsearch guide"
    }
  }
}

# Match phrase
GET /my_index/_search
{
  "query": {
    "match_phrase": {
      "title": "elasticsearch guide"
    }
  }
}

# Multi-match
GET /my_index/_search
{
  "query": {
    "multi_match": {
      "query": "elasticsearch",
      "fields": ["title", "content", "tags^2"]
    }
  }
}

# Term query (exact match)
GET /my_index/_search
{
  "query": {
    "term": {
      "status": "published"
    }
  }
}

# Terms query
GET /my_index/_search
{
  "query": {
    "terms": {
      "status": ["published", "draft"]
    }
  }
}`}
          />

          <CodeBlock
            language="bash"
            title="Range ve Exists"
            code={`# Range query
GET /my_index/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "2023-01-01",
        "lte": "2023-12-31"
      }
    }
  }
}

# Numeric range
GET /my_index/_search
{
  "query": {
    "range": {
      "views": {
        "gte": 100,
        "lt": 1000
      }
    }
  }
}

# Exists query
GET /my_index/_search
{
  "query": {
    "exists": {
      "field": "tags"
    }
  }
}

# Prefix query
GET /my_index/_search
{
  "query": {
    "prefix": {
      "title": "elastic"
    }
  }
}

# Wildcard query
GET /my_index/_search
{
  "query": {
    "wildcard": {
      "title": "elast*"
    }
  }
}

# Regexp query
GET /my_index/_search
{
  "query": {
    "regexp": {
      "title": "elast.+"
    }
  }
}`}
          />

          <CodeBlock
            language="bash"
            title="Bool Query"
            code={`GET /my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "elasticsearch" } }
      ],
      "must_not": [
        { "term": { "status": "draft" } }
      ],
      "should": [
        { "term": { "featured": true } }
      ],
      "filter": [
        { "range": { "date": { "gte": "2023-01-01" } } },
        { "term": { "category": "tech" } }
      ],
      "minimum_should_match": 1
    }
  }
}

# Nested bool
GET /my_index/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
            "should": [
              { "match": { "title": "elasticsearch" } },
              { "match": { "title": "kibana" } }
            ]
          }
        }
      ],
      "filter": [
        { "term": { "status": "published" } }
      ]
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Aggregations</h2>

          <CodeBlock
            language="bash"
            title="Bucket Aggregations"
            code={`# Terms aggregation
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": {
        "field": "category.keyword",
        "size": 10
      }
    }
  }
}

# Date histogram
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "posts_over_time": {
      "date_histogram": {
        "field": "date",
        "calendar_interval": "month"
      }
    }
  }
}

# Range aggregation
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "view_ranges": {
      "range": {
        "field": "views",
        "ranges": [
          { "to": 100 },
          { "from": 100, "to": 1000 },
          { "from": 1000 }
        ]
      }
    }
  }
}

# Histogram
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "view_histogram": {
      "histogram": {
        "field": "views",
        "interval": 100
      }
    }
  }
}`}
          />

          <CodeBlock
            language="bash"
            title="Metric Aggregations"
            code={`GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "avg_views": { "avg": { "field": "views" } },
    "max_views": { "max": { "field": "views" } },
    "min_views": { "min": { "field": "views" } },
    "sum_views": { "sum": { "field": "views" } },
    "count": { "value_count": { "field": "views" } },
    "stats": { "stats": { "field": "views" } },
    "extended_stats": { "extended_stats": { "field": "views" } },
    "cardinality": { "cardinality": { "field": "author.keyword" } },
    "percentiles": {
      "percentiles": {
        "field": "views",
        "percents": [25, 50, 75, 95, 99]
      }
    }
  }
}

# Sub-aggregations
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": { "field": "category.keyword" },
      "aggs": {
        "avg_views": { "avg": { "field": "views" } },
        "top_posts": {
          "top_hits": {
            "size": 3,
            "sort": [{ "views": "desc" }]
          }
        }
      }
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sorting ve Pagination</h2>

          <CodeBlock
            language="bash"
            title="Sorting"
            code={`GET /my_index/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "date": "desc" },
    { "views": "asc" },
    "_score"
  ]
}

# Nested sort
GET /my_index/_search
{
  "sort": [
    {
      "comments.date": {
        "order": "desc",
        "nested": {
          "path": "comments"
        }
      }
    }
  ]
}`}
          />

          <CodeBlock
            language="bash"
            title="Pagination"
            code={`# From/Size (max 10000)
GET /my_index/_search
{
  "from": 0,
  "size": 10,
  "query": { "match_all": {} }
}

# Search After (deep pagination)
GET /my_index/_search
{
  "size": 10,
  "query": { "match_all": {} },
  "sort": [
    { "date": "desc" },
    { "_id": "asc" }
  ],
  "search_after": ["2023-01-01", "abc123"]
}

# Scroll API
POST /my_index/_search?scroll=1m
{
  "size": 1000,
  "query": { "match_all": {} }
}

POST /_search/scroll
{
  "scroll": "1m",
  "scroll_id": "DXF1Z..."
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Mappings</h2>

          <CodeBlock
            language="bash"
            title="Field Types"
            code={`PUT /my_index
{
  "mappings": {
    "properties": {
      // Text types
      "title": { "type": "text" },
      "status": { "type": "keyword" },

      // Numeric types
      "views": { "type": "integer" },
      "price": { "type": "float" },
      "count": { "type": "long" },

      // Date
      "created_at": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
      },

      // Boolean
      "published": { "type": "boolean" },

      // Object
      "author": {
        "properties": {
          "name": { "type": "text" },
          "email": { "type": "keyword" }
        }
      },

      // Nested
      "comments": {
        "type": "nested",
        "properties": {
          "text": { "type": "text" },
          "user": { "type": "keyword" }
        }
      },

      // Geo
      "location": { "type": "geo_point" },

      // Multi-field
      "name": {
        "type": "text",
        "fields": {
          "keyword": { "type": "keyword" },
          "autocomplete": {
            "type": "text",
            "analyzer": "autocomplete"
          }
        }
      }
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python Client</h2>

          <CodeBlock
            language="python"
            title="Elasticsearch Python"
            code={`from elasticsearch import Elasticsearch

# Bağlantı
es = Elasticsearch(
    ["http://localhost:9200"],
    basic_auth=("user", "password")
)

# Index oluştur
es.indices.create(
    index="my_index",
    body={
        "settings": {"number_of_shards": 1},
        "mappings": {
            "properties": {
                "title": {"type": "text"},
                "views": {"type": "integer"}
            }
        }
    }
)

# Document ekle
es.index(
    index="my_index",
    id=1,
    body={"title": "Test", "views": 100}
)

# Document al
doc = es.get(index="my_index", id=1)

# Search
result = es.search(
    index="my_index",
    body={
        "query": {
            "match": {"title": "test"}
        },
        "aggs": {
            "avg_views": {"avg": {"field": "views"}}
        }
    }
)

for hit in result['hits']['hits']:
    print(hit['_source'])

# Bulk
from elasticsearch.helpers import bulk

actions = [
    {"_index": "my_index", "_id": i, "_source": {"title": f"Doc {i}"}}
    for i in range(100)
]
bulk(es, actions)

# Delete by query
es.delete_by_query(
    index="my_index",
    body={"query": {"term": {"status": "deleted"}}}
)`}
          />
        </section>
      </div>
    </div>
  )
}
