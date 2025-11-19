'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function SparkSQLCheatSheet() {
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
            <div className="p-3 rounded-xl bg-orange-600">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Spark SQL Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Big data SQL</p>
            </div>
          </div>
          <PDFDownload title="Spark SQL" sheetId="sparksql" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SparkSession ve DataFrame</h2>

          <CodeBlock
            language="python"
            title="Başlangıç"
            code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

# SparkSession oluştur
spark = SparkSession.builder \\
    .appName("MyApp") \\
    .config("spark.sql.warehouse.dir", "/user/hive/warehouse") \\
    .enableHiveSupport() \\
    .getOrCreate()

# DataFrame oluştur
data = [("Alice", 30), ("Bob", 25)]
df = spark.createDataFrame(data, ["name", "age"])

# Schema ile
schema = StructType([
    StructField("name", StringType(), True),
    StructField("age", IntegerType(), True)
])
df = spark.createDataFrame(data, schema)

# Pandas'tan
import pandas as pd
pdf = pd.DataFrame({"name": ["Alice"], "age": [30]})
df = spark.createDataFrame(pdf)`}
          />

          <CodeBlock
            language="python"
            title="Veri Okuma"
            code={`# CSV
df = spark.read.csv("data.csv", header=True, inferSchema=True)
df = spark.read.option("header", "true").csv("data.csv")

# JSON
df = spark.read.json("data.json")
df = spark.read.json("data.json", multiLine=True)

# Parquet
df = spark.read.parquet("data.parquet")

# ORC
df = spark.read.orc("data.orc")

# JDBC
df = spark.read.format("jdbc") \\
    .option("url", "jdbc:postgresql://host:5432/db") \\
    .option("dbtable", "users") \\
    .option("user", "user") \\
    .option("password", "pass") \\
    .load()

# Hive table
df = spark.sql("SELECT * FROM my_table")
df = spark.table("my_table")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SQL Sorguları</h2>

          <CodeBlock
            language="python"
            title="SQL Kullanımı"
            code={`# Temp view oluştur
df.createOrReplaceTempView("users")

# SQL çalıştır
result = spark.sql("""
    SELECT
        name,
        age,
        CASE
            WHEN age < 30 THEN 'Young'
            ELSE 'Adult'
        END as category
    FROM users
    WHERE age > 20
    ORDER BY age DESC
""")

# Global temp view
df.createOrReplaceGlobalTempView("global_users")
spark.sql("SELECT * FROM global_temp.global_users")

# CTE (Common Table Expression)
spark.sql("""
    WITH ranked AS (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) as rn
        FROM employees
    )
    SELECT * FROM ranked WHERE rn <= 3
""")

# Subquery
spark.sql("""
    SELECT * FROM users
    WHERE age > (SELECT AVG(age) FROM users)
""")`}
          />

          <CodeBlock
            language="python"
            title="Window Functions"
            code={`# SQL ile
spark.sql("""
    SELECT
        name,
        department,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num,
        RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank,
        SUM(salary) OVER (PARTITION BY department) as dept_total,
        AVG(salary) OVER (PARTITION BY department) as dept_avg,
        LAG(salary) OVER (PARTITION BY department ORDER BY salary) as prev_salary,
        LEAD(salary) OVER (PARTITION BY department ORDER BY salary) as next_salary,
        FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) as top_earner,
        NTILE(4) OVER (ORDER BY salary) as quartile
    FROM employees
""")

# DataFrame API ile
from pyspark.sql.window import Window

window = Window.partitionBy("department").orderBy(desc("salary"))

df.withColumn("rank", rank().over(window)) \\
  .withColumn("row_num", row_number().over(window))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DataFrame Operasyonları</h2>

          <CodeBlock
            language="python"
            title="Select ve Filter"
            code={`# Select
df.select("name", "age")
df.select(col("name"), col("age") + 1)
df.select("*")

# SelectExpr
df.selectExpr("name", "age * 2 as double_age")

# Filter / Where
df.filter(col("age") > 25)
df.where("age > 25")
df.filter((col("age") > 25) & (col("name") != "Bob"))

# Distinct
df.distinct()
df.dropDuplicates(["name"])

# Limit
df.limit(10)

# Sample
df.sample(fraction=0.1, seed=42)`}
          />

          <CodeBlock
            language="python"
            title="Aggregations"
            code={`from pyspark.sql.functions import *

# GroupBy
df.groupBy("department").count()

df.groupBy("department").agg(
    count("*").alias("count"),
    avg("salary").alias("avg_salary"),
    sum("salary").alias("total_salary"),
    min("salary").alias("min_salary"),
    max("salary").alias("max_salary"),
    stddev("salary").alias("std_salary"),
    collect_list("name").alias("names"),
    collect_set("name").alias("unique_names")
)

# Pivot
df.groupBy("year").pivot("quarter").sum("revenue")

# Cube ve Rollup
df.cube("department", "gender").count()
df.rollup("department", "gender").count()

# Having (filter after group)
df.groupBy("department") \\
  .agg(avg("salary").alias("avg_salary")) \\
  .filter(col("avg_salary") > 50000)`}
          />

          <CodeBlock
            language="python"
            title="Joins"
            code={`# Inner join
df1.join(df2, "id")
df1.join(df2, df1.id == df2.id)

# Join türleri
df1.join(df2, "id", "inner")
df1.join(df2, "id", "left")
df1.join(df2, "id", "right")
df1.join(df2, "id", "outer")
df1.join(df2, "id", "left_semi")  # exists
df1.join(df2, "id", "left_anti")  # not exists
df1.join(df2, "id", "cross")

# Multiple conditions
df1.join(
    df2,
    (df1.id == df2.id) & (df1.date == df2.date),
    "left"
)

# Broadcast join (küçük tablo için)
from pyspark.sql.functions import broadcast
df1.join(broadcast(df2), "id")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Column İşlemleri</h2>

          <CodeBlock
            language="python"
            title="Column Fonksiyonları"
            code={`from pyspark.sql.functions import *

# Yeni column ekle
df.withColumn("new_col", col("age") * 2)
df.withColumn("constant", lit(100))

# Column rename
df.withColumnRenamed("old_name", "new_name")

# Column drop
df.drop("column_name")

# Cast
df.withColumn("age_str", col("age").cast("string"))
df.withColumn("date", to_date("date_str", "yyyy-MM-dd"))

# String functions
df.withColumn("upper", upper(col("name")))
df.withColumn("lower", lower(col("name")))
df.withColumn("length", length(col("name")))
df.withColumn("trimmed", trim(col("name")))
df.withColumn("substr", substring(col("name"), 1, 3))
df.withColumn("concat", concat(col("first"), lit(" "), col("last")))
df.withColumn("replaced", regexp_replace(col("text"), "old", "new"))
df.withColumn("split", split(col("text"), ","))

# Date functions
df.withColumn("year", year(col("date")))
df.withColumn("month", month(col("date")))
df.withColumn("day", dayofmonth(col("date")))
df.withColumn("diff", datediff(col("end"), col("start")))
df.withColumn("added", date_add(col("date"), 7))

# Null handling
df.withColumn("filled", coalesce(col("val1"), col("val2"), lit(0)))
df.na.fill(0)
df.na.fill({"col1": 0, "col2": "unknown"})
df.na.drop()`}
          />

          <CodeBlock
            language="python"
            title="Conditional"
            code={`from pyspark.sql.functions import when, col

# When/Otherwise
df.withColumn(
    "category",
    when(col("age") < 18, "Minor")
    .when(col("age") < 65, "Adult")
    .otherwise("Senior")
)

# Case when SQL
spark.sql("""
    SELECT *,
        CASE
            WHEN age < 18 THEN 'Minor'
            WHEN age < 65 THEN 'Adult'
            ELSE 'Senior'
        END as category
    FROM users
""")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">UDF (User Defined Functions)</h2>

          <CodeBlock
            language="python"
            title="UDF Tanımlama"
            code={`from pyspark.sql.functions import udf
from pyspark.sql.types import StringType, IntegerType

# Python UDF
def categorize_age(age):
    if age < 18:
        return "Minor"
    elif age < 65:
        return "Adult"
    else:
        return "Senior"

# UDF kaydet
categorize_udf = udf(categorize_age, StringType())

# Kullan
df.withColumn("category", categorize_udf(col("age")))

# Decorator ile
@udf(returnType=IntegerType())
def square(x):
    return x * x

df.withColumn("squared", square(col("value")))

# SQL'de kullan
spark.udf.register("categorize", categorize_age, StringType())
spark.sql("SELECT name, categorize(age) FROM users")

# Pandas UDF (daha performanslı)
from pyspark.sql.functions import pandas_udf
import pandas as pd

@pandas_udf(StringType())
def upper_udf(s: pd.Series) -> pd.Series:
    return s.str.upper()

df.withColumn("upper_name", upper_udf(col("name")))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Yazma</h2>

          <CodeBlock
            language="python"
            title="Veri Kaydetme"
            code={`# Parquet (önerilen)
df.write.parquet("output/data.parquet")

# CSV
df.write.csv("output/data.csv", header=True)

# JSON
df.write.json("output/data.json")

# Mode seçenekleri
df.write.mode("overwrite").parquet("output")  # üzerine yaz
df.write.mode("append").parquet("output")     # ekle
df.write.mode("ignore").parquet("output")     # varsa atla
df.write.mode("error").parquet("output")      # hata ver

# Partition
df.write.partitionBy("year", "month").parquet("output")

# Bucket
df.write \\
    .bucketBy(10, "id") \\
    .sortBy("date") \\
    .saveAsTable("bucketed_table")

# JDBC
df.write.format("jdbc") \\
    .option("url", "jdbc:postgresql://host:5432/db") \\
    .option("dbtable", "output_table") \\
    .option("user", "user") \\
    .option("password", "pass") \\
    .save()

# Hive table
df.write.saveAsTable("my_table")
df.write.insertInto("my_table")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Optimizasyon</h2>

          <CodeBlock
            language="python"
            title="Performance Tips"
            code={`# Cache
df.cache()  # MEMORY_ONLY
df.persist(StorageLevel.MEMORY_AND_DISK)

# Unpersist
df.unpersist()

# Explain plan
df.explain()
df.explain(mode="extended")

# Coalesce ve Repartition
df.coalesce(1)  # partition azalt
df.repartition(10)  # partition artır/azalt
df.repartition("column")  # column'a göre partition

# Broadcast hint
df1.join(df2.hint("broadcast"), "id")

# AQE (Adaptive Query Execution)
spark.conf.set("spark.sql.adaptive.enabled", "true")

# Statistics
spark.sql("ANALYZE TABLE my_table COMPUTE STATISTICS")

# Predicate pushdown
df.filter(col("date") == "2023-01-01").select("id", "name")`}
          />

          <CodeBlock
            language="python"
            title="Configuration"
            code={`# Memory
spark.conf.set("spark.executor.memory", "4g")
spark.conf.set("spark.driver.memory", "2g")

# Shuffle partitions
spark.conf.set("spark.sql.shuffle.partitions", "200")

# Broadcast threshold
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10m")

# Show config
spark.conf.get("spark.sql.shuffle.partitions")`}
          />
        </section>
      </div>
    </div>
  )
}
