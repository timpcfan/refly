# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Refly.AI 是一个开源的人工智能协作工作空间，提供多线程对话、知识库集成、画布编辑和实时协作功能。项目采用 monorepo 结构，包含多个应用和包。

## 开发命令

### 常用命令
- `pnpm dev` - 启动开发服务器（排除桌面应用和扩展）
- `pnpm dev:electron` - 启动桌面应用开发
- `pnpm build` - 构建所有包
- `pnpm lint` - 运行代码检查
- `pnpm lint:fix` - 自动修复代码问题
- `pnpm format` - 格式化代码
- `pnpm test` - 运行所有测试
- `pnpm test:unit` - 运行单元测试
- `pnpm test:integration` - 运行集成测试

### 特定包构建
- `pnpm build:api` - 只构建 API
- `pnpm build:web` - 只构建 Web 应用
- `pnpm build:extension` - 只构建浏览器扩展

## 项目结构

### 主要应用
- `apps/api` - NestJS API 服务器
- `apps/web` - React Web 应用
- `apps/desktop` - Electron 桌面应用
- `apps/extension` - 浏览器扩展

### 核心包
- `packages/ai-workspace-common` - 共享的 AI 工作空间组件
- `packages/providers` - AI 提供商集成（OpenAI、Anthropic 等）
- `packages/utils` - 共享工具函数
- `packages/common-types` - 共享 TypeScript 类型
- `packages/skill-template` - AI 技能模板系统
- `packages/stores` - 状态管理
- `packages/canvas-common` - 画布相关功能

## 开发环境设置

1. 启动中间件服务：
   ```bash
   docker compose -f deploy/docker/docker-compose.middleware.yml -p refly up -d
   ```

2. 安装依赖：
   ```bash
   corepack enable
   pnpm install
   ```

3. 复制环境变量：
   ```bash
   pnpm copy-env:develop
   ```

4. 首次构建：
   ```bash
   pnpm build
   ```

5. 启动开发：
   ```bash
   pnpm dev
   ```

## 测试框架

- **API 测试**: 使用 Jest (`apps/api`)
- **工具包测试**: 使用 Vitest (`packages/utils`, `packages/canvas-common`)
- **E2E 测试**: 使用 Cypress (`cypress/`)

## 代码规范

- **格式化**: Biome (替代 ESLint + Prettier)
- **TypeScript**: 严格模式启用
- **代码风格**: 2 空格缩进，单引号，尾随逗号

## 数据库

- 使用 Prisma ORM (`apps/api/prisma/`)
- 支持 SQLite 和 PostgreSQL
- 数据库迁移：`npx prisma migrate dev`

## 部署

### Docker 部署
```bash
cd deploy/docker
cp ../../apps/api/.env.example .env
docker compose up -d
```

### Kubernetes 部署
```bash
cd deploy/kubernetes
kubectl apply -f refly-deployment.yaml
```

## 开发注意事项

1. **环境变量**: 所有应用共享根目录的 `.env` 文件
2. **类型安全**: 使用共享类型定义确保前后端类型一致
3. **实时协作**: 基于 Yjs 和 WebSocket 实现
4. **AI 集成**: 支持多个 AI 提供商，可灵活切换
5. **画布系统**: 基于 ReactFlow 的自定义画布实现

## 调试技巧

- API 调试: `pnpm test:debug` (在 API 目录)
- 前端调试: 使用 React DevTools
- 数据库调试: 使用 Prisma Studio (`npx prisma studio`)
- 实时协作调试: 检查 WebSocket 连接状态