'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Server, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function AnsibleCheatSheet() {
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
            <div className="p-3 rounded-xl bg-red-500">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Ansible Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Configuration management</p>
            </div>
          </div>
          <PDFDownload title="Ansible" sheetId="ansible" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Ad-hoc Komutlar"
            code={`# Ping testi
ansible all -m ping

# Komut calistir
ansible webservers -m command -a "uptime"
ansible webservers -m shell -a "df -h | grep /dev"

# Paket yukle
ansible webservers -m apt -a "name=nginx state=present" -b
ansible webservers -m yum -a "name=httpd state=latest" -b

# Servis yonet
ansible webservers -m service -a "name=nginx state=started" -b

# Dosya kopyala
ansible webservers -m copy -a "src=/local/file dest=/remote/file"

# Bilgi topla
ansible all -m setup
ansible all -m setup -a "filter=ansible_distribution*"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Inventory</h2>

          <CodeBlock
            language="ini"
            title="hosts.ini"
            code={`# Basit inventory
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com ansible_port=2222
db2.example.com ansible_user=admin

[all:vars]
ansible_python_interpreter=/usr/bin/python3

# Gruplar
[production:children]
webservers
dbservers

# Host degiskenleri
[webservers:vars]
http_port=80
max_clients=200`}
          />

          <CodeBlock
            language="yaml"
            title="inventory.yml"
            code={`all:
  hosts:
    mail.example.com:
  children:
    webservers:
      hosts:
        web1.example.com:
        web2.example.com:
      vars:
        http_port: 80
    dbservers:
      hosts:
        db1.example.com:
          ansible_port: 2222
        db2.example.com:
          ansible_user: admin`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Playbook Yapisi</h2>

          <CodeBlock
            language="yaml"
            title="playbook.yml"
            code={`---
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    http_port: 80
    doc_root: /var/www/html

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Copy index.html
      template:
        src: index.html.j2
        dest: "{{ doc_root }}/index.html"
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted`}
          />

          <CodeBlock
            language="bash"
            title="Playbook Calistirma"
            code={`# Temel calistirma
ansible-playbook playbook.yml

# Inventory belirt
ansible-playbook -i inventory.ini playbook.yml

# Limit hosts
ansible-playbook playbook.yml --limit webservers

# Check mode (dry run)
ansible-playbook playbook.yml --check

# Verbose
ansible-playbook playbook.yml -v
ansible-playbook playbook.yml -vvv

# Extra variables
ansible-playbook playbook.yml -e "version=1.2.3"

# Tags
ansible-playbook playbook.yml --tags "install,configure"
ansible-playbook playbook.yml --skip-tags "deploy"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Variables</h2>

          <CodeBlock
            language="yaml"
            title="Degisken Tanimlama"
            code={`# Playbook'ta
vars:
  http_port: 80
  packages:
    - nginx
    - php-fpm

# vars_files ile
vars_files:
  - vars/main.yml
  - vars/{{ ansible_os_family }}.yml

# Kayitli degisken
- name: Get disk info
  command: df -h
  register: disk_info

- debug:
    var: disk_info.stdout_lines

# set_fact ile
- set_fact:
    full_name: "{{ first_name }} {{ last_name }}"

# Varsayilan deger
{{ variable | default('default_value') }}

# Host/Group vars
# group_vars/webservers.yml
# host_vars/web1.example.com.yml`}
          />

          <CodeBlock
            language="yaml"
            title="Degisken Onceligi"
            code={`# Dusukten yuksege:
# 1. role defaults
# 2. inventory vars
# 3. group_vars/all
# 4. group_vars/group
# 5. host_vars/host
# 6. play vars
# 7. role vars
# 8. task vars
# 9. extra vars (-e)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Conditionals & Loops</h2>

          <CodeBlock
            language="yaml"
            title="When Kosullari"
            code={`# Basit kosul
- name: Install on Debian
  apt:
    name: nginx
  when: ansible_os_family == "Debian"

# Coklu kosul
- name: Install on Ubuntu 20.04
  apt:
    name: nginx
  when:
    - ansible_distribution == "Ubuntu"
    - ansible_distribution_version == "20.04"

# OR kosulu
- name: Shutdown systems
  command: /sbin/shutdown -h now
  when: ansible_os_family == "Debian" or ansible_os_family == "RedHat"

# Degisken kontrolu
- name: Run if defined
  debug:
    var: my_var
  when: my_var is defined

# Register sonucu
- name: Check file
  stat:
    path: /etc/nginx/nginx.conf
  register: nginx_conf

- name: Copy if missing
  copy:
    src: nginx.conf
    dest: /etc/nginx/nginx.conf
  when: not nginx_conf.stat.exists`}
          />

          <CodeBlock
            language="yaml"
            title="Loops"
            code={`# Basit loop
- name: Install packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - php-fpm
    - mysql-server

# Dict loop
- name: Create users
  user:
    name: "{{ item.name }}"
    groups: "{{ item.groups }}"
  loop:
    - { name: 'user1', groups: 'wheel' }
    - { name: 'user2', groups: 'root' }

# with_items (eski yontem)
- name: Install packages
  apt:
    name: "{{ item }}"
  with_items:
    - nginx
    - php

# Loop kontrolu
- name: Loop with index
  debug:
    msg: "{{ index }} - {{ item }}"
  loop:
    - a
    - b
    - c
  loop_control:
    index_var: index`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Templates (Jinja2)</h2>

          <CodeBlock
            language="jinja2"
            title="template.conf.j2"
            code={`# Degisken kullanimi
server_name {{ ansible_hostname }};
listen {{ http_port }};

# Kosullar
{% if enable_ssl %}
listen 443 ssl;
ssl_certificate {{ ssl_cert_path }};
{% endif %}

# Donguler
{% for host in groups['webservers'] %}
server {{ hostvars[host]['ansible_host'] }};
{% endfor %}

# Filtreler
{{ my_var | upper }}
{{ my_list | join(', ') }}
{{ my_var | default('default') }}
{{ path | basename }}
{{ date | to_datetime }}

# Comments
{# Bu bir yorumdur #}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Roles</h2>

          <CodeBlock
            language="bash"
            title="Role Yapisi"
            code={`roles/
  nginx/
    tasks/
      main.yml
    handlers/
      main.yml
    templates/
      nginx.conf.j2
    files/
      index.html
    vars/
      main.yml
    defaults/
      main.yml
    meta/
      main.yml

# Role olustur
ansible-galaxy init nginx`}
          />

          <CodeBlock
            language="yaml"
            title="Role Kullanimi"
            code={`# Playbook'ta role kullan
---
- hosts: webservers
  roles:
    - nginx
    - { role: database, db_name: mydb }
    - role: app
      vars:
        app_port: 8080
      tags: ['app']

# include_role
- name: Include role
  include_role:
    name: nginx
  vars:
    nginx_port: 8080

# import_role
- import_role:
    name: nginx
  when: install_nginx`}
          />

          <CodeBlock
            language="yaml"
            title="Role Dependencies (meta/main.yml)"
            code={`---
dependencies:
  - role: common
  - role: nginx
    vars:
      nginx_port: 80
  - role: geerlingguy.docker`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Yaygın Modüller</h2>

          <CodeBlock
            language="yaml"
            title="Dosya Islemleri"
            code={`# Dosya/dizin olustur
- file:
    path: /etc/app
    state: directory
    owner: root
    group: root
    mode: '0755'

# Dosya kopyala
- copy:
    src: files/app.conf
    dest: /etc/app/app.conf
    owner: root
    mode: '0644'

# Template
- template:
    src: app.conf.j2
    dest: /etc/app/app.conf
    validate: '/usr/sbin/nginx -t -c %s'

# Satir ekle/degistir
- lineinfile:
    path: /etc/hosts
    line: '192.168.1.100 app.local'
    state: present

# Block ekle
- blockinfile:
    path: /etc/ssh/sshd_config
    block: |
      Match User ansible
        PasswordAuthentication no`}
          />

          <CodeBlock
            language="yaml"
            title="Paket ve Servis"
            code={`# APT
- apt:
    name: nginx
    state: present
    update_cache: yes

# YUM/DNF
- yum:
    name: httpd
    state: latest

# Package (generic)
- package:
    name: git
    state: present

# Service
- service:
    name: nginx
    state: started
    enabled: yes

# Systemd
- systemd:
    name: nginx
    state: restarted
    daemon_reload: yes`}
          />

          <CodeBlock
            language="yaml"
            title="Kullanici ve Grup"
            code={`# Kullanici olustur
- user:
    name: deploy
    groups: www-data
    shell: /bin/bash
    create_home: yes
    generate_ssh_key: yes

# Grup olustur
- group:
    name: admin
    state: present

# SSH key ekle
- authorized_key:
    user: deploy
    key: "{{ lookup('file', 'keys/deploy.pub') }}"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ansible Vault</h2>

          <CodeBlock
            language="bash"
            title="Vault Komutlari"
            code={`# Sifrelenmis dosya olustur
ansible-vault create secrets.yml

# Mevcut dosyayi sifrele
ansible-vault encrypt vars.yml

# Sifre coz
ansible-vault decrypt vars.yml

# Duzenle
ansible-vault edit secrets.yml

# Sifre degistir
ansible-vault rekey secrets.yml

# Icerik goster
ansible-vault view secrets.yml

# Playbook calistir
ansible-playbook site.yml --ask-vault-pass
ansible-playbook site.yml --vault-password-file .vault_pass`}
          />

          <CodeBlock
            language="yaml"
            title="Vault Kullanimi"
            code={`# secrets.yml (sifrelenmis)
db_password: supersecret
api_key: abc123

# playbook.yml
- hosts: all
  vars_files:
    - secrets.yml
  tasks:
    - name: Configure app
      template:
        src: config.j2
        dest: /etc/app/config

# Inline sifreleme
password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  62313365...`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Error Handling</h2>

          <CodeBlock
            language="yaml"
            title="Hata Yonetimi"
            code={`# Hatayi yoksay
- name: This might fail
  command: /bin/false
  ignore_errors: yes

# Hata kosulu
- name: Fail if not found
  command: grep pattern file.txt
  register: result
  failed_when: result.rc != 0 and result.rc != 1

# Changed kosulu
- name: Check mode
  command: echo "hello"
  changed_when: false

# Block/rescue/always
- block:
    - name: Try this
      command: /bin/might_fail
  rescue:
    - name: Handle error
      debug:
        msg: "Task failed, running rescue"
  always:
    - name: Always run
      debug:
        msg: "This always runs"

# Any errors fatal
- hosts: all
  any_errors_fatal: true
  tasks:
    - name: Critical task
      command: /bin/critical`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ansible Galaxy</h2>

          <CodeBlock
            language="bash"
            title="Galaxy Komutlari"
            code={`# Role ara
ansible-galaxy search nginx

# Role bilgisi
ansible-galaxy info geerlingguy.nginx

# Role yukle
ansible-galaxy install geerlingguy.nginx
ansible-galaxy install geerlingguy.nginx,2.0.0

# requirements.yml'dan yukle
ansible-galaxy install -r requirements.yml

# Collection yukle
ansible-galaxy collection install community.general

# Liste
ansible-galaxy list`}
          />

          <CodeBlock
            language="yaml"
            title="requirements.yml"
            code={`---
roles:
  - name: geerlingguy.nginx
    version: 3.1.0
  - name: geerlingguy.docker
  - src: https://github.com/user/role.git
    scm: git
    version: master

collections:
  - name: community.general
    version: ">=3.0.0"
  - name: ansible.posix`}
          />
        </section>
      </div>
    </div>
  )
}
