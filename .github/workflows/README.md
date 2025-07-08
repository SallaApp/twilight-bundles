# GitHub Workflows

This directory contains GitHub Actions workflows for automating various tasks in the twilight-bundles repository.

## Available Workflows

### Deploy Form Builder Mock API

**File:** `deploy-form-builder-mock.yml`

This workflow automatically deploys the Form Builder Mock API to Cloudflare Workers when changes are pushed to the main branch or when manually triggered.

#### Workflow Details:

- **Triggers:**
  - Push to `main` branch (only when files in `packages/form-builder-mock/**` are changed)
  - Manual trigger via GitHub Actions UI (workflow_dispatch)

- **Jobs:**
  - Deploys the Cloudflare Worker from the `packages/form-builder-mock` directory

#### Required Secrets:

To use this workflow, you need to add the following secrets to your GitHub repository:

- `CF_API_TOKEN`: Your Cloudflare API token with Workers permissions
- `CF_ACCOUNT_ID`: Your Cloudflare account ID

#### How to Add Secrets:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the required secrets

#### How to Manually Trigger:

1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy Form Builder Mock API" workflow
3. Click "Run workflow"
4. Select the branch to run from
5. Click "Run workflow"
