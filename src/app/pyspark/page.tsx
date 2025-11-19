'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function PySparkCheatSheet() {
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
            <div className="p-3 rounded-xl bg-orange-500">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PySpark Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Big data processing</p>
            </div>
          </div>
          <PDFDownload title="PySpark" sheetId="pyspark" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SparkSession</h2>

          <CodeBlock
            language="python"
            title="Spark Baslangic"
            code={`from pyspark.sql import SparkSession

# SparkSession olustur
spark = SparkSession.builder \\
    .appName("MyApp") \\
    .config("spark.executor.memory", "4g") \\
    .config("spark.driver.memory", "2g") \\
    .getOrCreate()

# Spark context
sc = spark.sparkContext

# Kapat
spark.stop()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DataFrame Olusturma</h2>

          <CodeBlock
            language="python"
            title="DataFrame Create"
            code={`from pyspark.sql.types import StructType, StructField, StringType, IntegerType

# List'ten
data = [("Ali", 25), ("Veli", 30), ("Ayse", 28)]
df = spark.createDataFrame(data, ["name", "age"])

# Schema ile
schema = StructType([
    StructField("name", StringType(), True),
    StructField("age", IntegerType(), True)
])
df = spark.createDataFrame(data, schema)

# Dict list'ten
data = [{"name": "Ali", "age": 25}, {"name": "Veli", "age": 30}]
df = spark.createDataFrame(data)

# Pandas'tan
import pandas as pd
pdf = pd.DataFrame({"name": ["Ali", "Veli"], "age": [25, 30]})
df = spark.createDataFrame(pdf)

# Dosyadan okuma
df = spark.read.csv("data.csv", header=True, inferSchema=True)
df = spark.read.json("data.json")
df = spark.read.parquet("data.parquet")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DataFrame Islemleri</h2>

          <CodeBlock
            language="python"
            title="Basic Operations"
            code={`# Goster
df.show()
df.show(5, truncate=False)

# Schema
df.printSchema()

# Columns
df.columns
df.dtypes

# Statistics
df.describe().show()
df.count()

# Select
df.select("name", "age")
df.select(df.name, df.age + 1)

# Alias
df.select(df.age.alias("yas"))

# Filter/Where
df.filter(df.age > 25)
df.where("age > 25")
df.filter((df.age > 25) & (df.name == "Ali"))

# Distinct
df.distinct()
df.select("name").distinct()

# Sort
df.orderBy("age")
df.orderBy(df.age.desc())
df.sort("age", ascending=False)`}
          />

          <CodeBlock
            language="python"
            title="Column Operations"
            code={`from pyspark.sql.functions import col, lit, when

# Column reference
df.select(col("name"))
df.select(df["name"])

# New column
df.withColumn("age_plus", df.age + 1)
df.withColumn("constant", lit(100))

# Rename
df.withColumnRenamed("name", "isim")

# Drop
df.drop("age")

# Cast
df.withColumn("age", df.age.cast("double"))

# Conditional
df.withColumn("category",
    when(df.age < 25, "young")
    .when(df.age < 35, "adult")
    .otherwise("senior")
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Aggregations</h2>

          <CodeBlock
            language="python"
            title="Group By ve Aggregate"
            code={`from pyspark.sql.functions import sum, avg, count, min, max

# Group by
df.groupBy("department").count()

# Multiple aggregations
df.groupBy("department").agg(
    sum("salary").alias("total_salary"),
    avg("salary").alias("avg_salary"),
    count("*").alias("count"),
    min("age").alias("min_age"),
    max("age").alias("max_age")
)

# Pivot
df.groupBy("year").pivot("department").sum("sales")

# Window functions
from pyspark.sql.window import Window

window = Window.partitionBy("department").orderBy("salary")

df.withColumn("rank", rank().over(window))
df.withColumn("row_num", row_number().over(window))
df.withColumn("running_sum", sum("salary").over(window))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Joins</h2>

          <CodeBlock
            language="python"
            title="DataFrame Joins"
            code={`# Inner join
df1.join(df2, df1.id == df2.id, "inner")

# Left join
df1.join(df2, "id", "left")

# Join types
df1.join(df2, "id", "inner")
df1.join(df2, "id", "left")
df1.join(df2, "id", "right")
df1.join(df2, "id", "outer")
df1.join(df2, "id", "left_semi")
df1.join(df2, "id", "left_anti")

# Multiple conditions
df1.join(df2,
    (df1.id == df2.id) & (df1.date == df2.date),
    "inner"
)

# Cross join
df1.crossJoin(df2)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">String Functions</h2>

          <CodeBlock
            language="python"
            title="String Islemleri"
            code={`from pyspark.sql.functions import (
    lower, upper, trim, length, substring,
    concat, concat_ws, split, regexp_replace
)

df.select(
    lower("name"),
    upper("name"),
    trim("name"),
    length("name"),
    substring("name", 1, 3),
    concat("first_name", lit(" "), "last_name"),
    concat_ws("-", "year", "month", "day"),
    split("tags", ","),
    regexp_replace("text", "pattern", "replacement")
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Date Functions</h2>

          <CodeBlock
            language="python"
            title="Date Islemleri"
            code={`from pyspark.sql.functions import (
    current_date, current_timestamp, date_format,
    year, month, dayofmonth, hour, minute,
    datediff, date_add, date_sub, to_date
)

df.select(
    current_date(),
    current_timestamp(),
    year("date"),
    month("date"),
    dayofmonth("date"),
    date_format("date", "yyyy-MM-dd"),
    datediff("end_date", "start_date"),
    date_add("date", 7),
    to_date("date_string", "yyyy-MM-dd")
)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Null Handling</h2>

          <CodeBlock
            language="python"
            title="Null Islemleri"
            code={`from pyspark.sql.functions import isnull, coalesce

# Drop nulls
df.dropna()
df.dropna(subset=["name", "age"])
df.dropna(how="all")

# Fill nulls
df.fillna(0)
df.fillna({"age": 0, "name": "Unknown"})

# Check null
df.filter(isnull("name"))
df.filter(df.name.isNull())
df.filter(df.name.isNotNull())

# Coalesce
df.select(coalesce("col1", "col2", lit("default")))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SQL Queries</h2>

          <CodeBlock
            language="python"
            title="Spark SQL"
            code={`# Register temp view
df.createOrReplaceTempView("users")

# SQL query
result = spark.sql("""
    SELECT name, age,
           CASE WHEN age < 25 THEN 'young' ELSE 'adult' END as category
    FROM users
    WHERE age > 20
    ORDER BY age DESC
""")

# Global temp view
df.createOrReplaceGlobalTempView("global_users")
spark.sql("SELECT * FROM global_temp.global_users")`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Write Data</h2>

          <CodeBlock
            language="python"
            title="DataFrame Yazma"
            code={`# CSV
df.write.csv("output.csv", header=True, mode="overwrite")

# Parquet
df.write.parquet("output.parquet", mode="overwrite")

# JSON
df.write.json("output.json")

# Partitioned
df.write.partitionBy("year", "month").parquet("output")

# Modes
df.write.mode("overwrite").parquet("output")  # Uzerine yaz
df.write.mode("append").parquet("output")     # Ekle
df.write.mode("ignore").parquet("output")     # Varsa atla
df.write.mode("error").parquet("output")      # Hata ver

# To pandas
pdf = df.toPandas()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">UDF (User Defined Functions)</h2>

          <CodeBlock
            language="python"
            title="Custom Functions"
            code={`from pyspark.sql.functions import udf
from pyspark.sql.types import StringType, IntegerType

# Python function
def categorize(age):
    if age < 25:
        return "young"
    elif age < 35:
        return "adult"
    else:
        return "senior"

# Register UDF
categorize_udf = udf(categorize, StringType())

# Use UDF
df.withColumn("category", categorize_udf(df.age))

# Decorator
@udf(returnType=IntegerType())
def double(x):
    return x * 2

df.select(double(df.age))`}
          />
        </section>
      </div>
    </div>
  )
}
