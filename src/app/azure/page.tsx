'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Cloud, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function AzureCheatSheet() {
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
            <div className="p-3 rounded-xl bg-blue-500">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Azure Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Microsoft Cloud</p>
            </div>
          </div>
          <PDFDownload title="Azure" sheetId="azure" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Azure CLI</h2>

          <CodeBlock
            language="bash"
            title="Temel Komutlar"
            code={`# Login
az login
az login --service-principal -u <app-id> -p <password> --tenant <tenant>

# Account
az account list
az account set --subscription <subscription-id>
az account show

# Resource groups
az group list
az group create --name mygroup --location eastus
az group delete --name mygroup

# Locations
az account list-locations

# Output format
az vm list --output table
az vm list --output json
az vm list --output yaml`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Virtual Machines</h2>

          <CodeBlock
            language="bash"
            title="VM İşlemleri"
            code={`# VM listele
az vm list --output table
az vm list -g mygroup

# VM oluştur
az vm create \\
    --resource-group mygroup \\
    --name myvm \\
    --image UbuntuLTS \\
    --size Standard_DS2_v2 \\
    --admin-username azureuser \\
    --generate-ssh-keys

# VM bilgisi
az vm show -g mygroup -n myvm
az vm get-instance-view -g mygroup -n myvm

# VM başlat/durdur
az vm start -g mygroup -n myvm
az vm stop -g mygroup -n myvm
az vm deallocate -g mygroup -n myvm
az vm restart -g mygroup -n myvm

# VM sil
az vm delete -g mygroup -n myvm

# VM boyutları
az vm list-sizes --location eastus
az vm resize -g mygroup -n myvm --size Standard_DS3_v2

# VM images
az vm image list --output table
az vm image list --publisher Canonical --all`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Storage</h2>

          <CodeBlock
            language="bash"
            title="Storage Account"
            code={`# Storage account oluştur
az storage account create \\
    --name mystorageaccount \\
    --resource-group mygroup \\
    --location eastus \\
    --sku Standard_LRS \\
    --kind StorageV2

# Account keys
az storage account keys list -g mygroup -n mystorageaccount

# Connection string
az storage account show-connection-string -g mygroup -n mystorageaccount

# Container oluştur
az storage container create \\
    --name mycontainer \\
    --account-name mystorageaccount

# Blob upload
az storage blob upload \\
    --account-name mystorageaccount \\
    --container-name mycontainer \\
    --name myblob \\
    --file ./localfile.txt

# Blob download
az storage blob download \\
    --account-name mystorageaccount \\
    --container-name mycontainer \\
    --name myblob \\
    --file ./downloaded.txt

# Blob listele
az storage blob list \\
    --account-name mystorageaccount \\
    --container-name mycontainer \\
    --output table`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">App Service</h2>

          <CodeBlock
            language="bash"
            title="Web App"
            code={`# App Service Plan oluştur
az appservice plan create \\
    --name myplan \\
    --resource-group mygroup \\
    --sku B1 \\
    --is-linux

# Web app oluştur
az webapp create \\
    --name mywebapp \\
    --resource-group mygroup \\
    --plan myplan \\
    --runtime "PYTHON|3.9"

# Web app listele
az webapp list --output table

# App settings
az webapp config appsettings set \\
    --name mywebapp \\
    --resource-group mygroup \\
    --settings KEY=value

# Deployment from Git
az webapp deployment source config \\
    --name mywebapp \\
    --resource-group mygroup \\
    --repo-url https://github.com/user/repo \\
    --branch main \\
    --manual-integration

# Deployment from ZIP
az webapp deployment source config-zip \\
    --name mywebapp \\
    --resource-group mygroup \\
    --src app.zip

# Logs
az webapp log tail -n mywebapp -g mygroup`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Azure Functions</h2>

          <CodeBlock
            language="bash"
            title="Functions"
            code={`# Function app oluştur
az functionapp create \\
    --name myfuncapp \\
    --resource-group mygroup \\
    --storage-account mystorageaccount \\
    --consumption-plan-location eastus \\
    --runtime python \\
    --runtime-version 3.9 \\
    --functions-version 4

# Function listele
az functionapp list --output table

# Function app settings
az functionapp config appsettings set \\
    --name myfuncapp \\
    --resource-group mygroup \\
    --settings "KEY=value"

# Deployment
func azure functionapp publish myfuncapp`}
          />

          <CodeBlock
            language="python"
            title="Python Function Örneği"
            code={`import azure.functions as func
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
            name = req_body.get('name')
        except ValueError:
            pass

    if name:
        return func.HttpResponse(
            json.dumps({"message": f"Hello, {name}!"}),
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
            "Please pass a name",
            status_code=400
        )`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">AKS (Kubernetes)</h2>

          <CodeBlock
            language="bash"
            title="AKS Cluster"
            code={`# AKS cluster oluştur
az aks create \\
    --resource-group mygroup \\
    --name myaks \\
    --node-count 3 \\
    --node-vm-size Standard_DS2_v2 \\
    --enable-addons monitoring \\
    --generate-ssh-keys

# Credentials al
az aks get-credentials -g mygroup -n myaks

# Cluster bilgisi
az aks show -g mygroup -n myaks

# Node pools
az aks nodepool list -g mygroup --cluster-name myaks
az aks nodepool add \\
    --resource-group mygroup \\
    --cluster-name myaks \\
    --name mynodepool \\
    --node-count 3

# Scale
az aks scale -g mygroup -n myaks --node-count 5

# Upgrade
az aks get-upgrades -g mygroup -n myaks
az aks upgrade -g mygroup -n myaks --kubernetes-version 1.25.0`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Database</h2>

          <CodeBlock
            language="bash"
            title="Azure SQL"
            code={`# SQL Server oluştur
az sql server create \\
    --name myserver \\
    --resource-group mygroup \\
    --location eastus \\
    --admin-user myadmin \\
    --admin-password MyP@ssword123

# Firewall rule
az sql server firewall-rule create \\
    --resource-group mygroup \\
    --server myserver \\
    --name AllowMyIP \\
    --start-ip-address 1.2.3.4 \\
    --end-ip-address 1.2.3.4

# Database oluştur
az sql db create \\
    --resource-group mygroup \\
    --server myserver \\
    --name mydb \\
    --service-objective S0`}
          />

          <CodeBlock
            language="bash"
            title="Cosmos DB"
            code={`# Cosmos DB account
az cosmosdb create \\
    --name mycosmosdb \\
    --resource-group mygroup \\
    --kind MongoDB

# Database oluştur
az cosmosdb mongodb database create \\
    --account-name mycosmosdb \\
    --name mydb \\
    --resource-group mygroup

# Collection oluştur
az cosmosdb mongodb collection create \\
    --account-name mycosmosdb \\
    --database-name mydb \\
    --name mycollection \\
    --resource-group mygroup`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Networking</h2>

          <CodeBlock
            language="bash"
            title="Virtual Network"
            code={`# VNet oluştur
az network vnet create \\
    --name myvnet \\
    --resource-group mygroup \\
    --address-prefix 10.0.0.0/16 \\
    --subnet-name mysubnet \\
    --subnet-prefix 10.0.1.0/24

# Subnet ekle
az network vnet subnet create \\
    --vnet-name myvnet \\
    --resource-group mygroup \\
    --name anothersubnet \\
    --address-prefix 10.0.2.0/24

# NSG oluştur
az network nsg create \\
    --name mynsg \\
    --resource-group mygroup

# NSG rule
az network nsg rule create \\
    --nsg-name mynsg \\
    --resource-group mygroup \\
    --name AllowSSH \\
    --priority 100 \\
    --destination-port-ranges 22 \\
    --access Allow \\
    --protocol Tcp

# Public IP
az network public-ip create \\
    --name mypublicip \\
    --resource-group mygroup \\
    --allocation-method Static`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python SDK</h2>

          <CodeBlock
            language="python"
            title="Azure SDK Kullanımı"
            code={`from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
from azure.mgmt.compute import ComputeManagementClient

# Credential
credential = DefaultAzureCredential()

# Blob Storage
blob_service = BlobServiceClient(
    account_url="https://myaccount.blob.core.windows.net",
    credential=credential
)

container_client = blob_service.get_container_client("mycontainer")

# Upload blob
with open("local.txt", "rb") as data:
    container_client.upload_blob("myblob", data)

# Download blob
blob_client = container_client.get_blob_client("myblob")
with open("download.txt", "wb") as file:
    file.write(blob_client.download_blob().readall())

# Compute (VM listele)
compute_client = ComputeManagementClient(credential, subscription_id)
for vm in compute_client.virtual_machines.list_all():
    print(vm.name)`}
          />
        </section>
      </div>
    </div>
  )
}
