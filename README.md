# Universal AI Model API Pricing Hub

Machine-readable pricing data and an interactive cost calculator for major AI APIs. The dataset was audited against first-party provider documentation on **August 5, 2026**.

The repository tracks 55 current pay-as-you-go API entries from **OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral AI, and Kimi**. Token-priced models use USD per 1 million tokens; audio, transcription, speech, image, and other specialist models retain their official billing unit.

## 🚀 Interactive Live Web Dashboard

Explore and compare AI API pricing in real time on the live interactive web dashboard:
👉 **[https://adamejzak.github.io/ai-pricing/](https://adamejzak.github.io/ai-pricing/)**

Features:
- **Collapsible Token Cost Calculator**: Enter custom input/output token amounts to compare exact request costs across models.
- **Side-by-Side Model Comparator**: Select any two models (e.g. GPT-4o vs Gemini 3.1 Pro or Claude 3.7) to compare pricing, context windows, and calculate exact percentage savings per request.
- **Provider & Category Filters**: Filter by OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, and Kimi.
- **Grid & Table Views**: View side-by-side pricing, context window limits, and cached prompt discounts.
- **Local offline support**: You can also open [`index.html`](index.html) directly in your browser.

## Current model comparison

Standard first-party API rates in USD per 1 million tokens:

| Provider | Model ID | Category | Context window | Input | Cached input | Output |
| :--- | :--- | :--- | ---: | ---: | ---: | ---: |
| OpenAI | `gpt-5.6-sol` | Flagship | 1.05M | $5.00 | $0.50 | $30.00 |
| OpenAI | `gpt-5.6-terra` | General | 1.05M | $2.00 | $0.20 | $12.00 |
| OpenAI | `gpt-5.6-luna` | Fast | 1.05M | $0.20 | $0.02 | $1.20 |
| OpenAI | `gpt-4o-mini` | Fast | 128k | $0.15 | $0.075 | $0.60 |
| Anthropic | `claude-fable-5` | Flagship | 1M | $10.00 | $1.00 | $50.00 |
| Anthropic | `claude-opus-5` | Flagship | 1M | $5.00 | $0.50 | $25.00 |
| Anthropic | `claude-sonnet-5` | General | 1M | $2.00 | $0.20 | $10.00 |
| Google | `gemini-3.1-pro` | Flagship | 2,097,152 | $2.00 | $0.20 | $12.00 |
| Google | `gemini-3.6-flash` | Fast | 1,048,576 | $1.50 | $0.15 | $7.50 |
| DeepSeek | `deepseek-v4-pro` | Flagship | 1M | $0.435 | $0.003625 | $0.87 |
| DeepSeek | `deepseek-v4-flash` | Fast | 1M | $0.14 | $0.0028 | $0.28 |
| Mistral | `mistral-medium-latest` | Flagship | 256k | $1.50 | $0.15 | $7.50 |
| Mistral | `mistral-large-latest` | Flagship | 256k | $0.50 | $0.05 | $1.50 |
| Kimi | `kimi-k3` | Flagship | 1M | $3.00 | $0.30 | $15.00 |

The table shows base rates. The dashboard calculator and JSON metadata also apply these published long-context tiers:

- OpenAI requests to GPT-5.6, GPT-5.5, GPT-5.4, and GPT-5.4 Pro with more than 272k input tokens use the provider's long-context multiplier: 2× input and 1.5× output for the full request.
- The Gemini 3.1 Pro rates shown above apply to prompts up to 200k tokens. Above 200k, the rates are $4.00 input, $0.40 cached input, and $18.00 output.
- Claude Sonnet 5 uses introductory $2.00/$10.00 input/output pricing through August 31, 2026; Anthropic lists $3.00/$15.00 from September 1, 2026.
- Cached-input fields represent cache reads/hits. Provider-specific cache-write and cache-storage charges are not included.

The JSON catalog includes active general-purpose and specialist endpoints where official rates are published. Models billed by minute, character, image, audio token, or another unit expose that unit explicitly and are not forced into a misleading text-token calculation. Regional uplifts, tools, fine-tuning, and provisioned-capacity products remain outside this calculator's scope.

## Repository data

- [`pricing.json`](pricing.json) — combined dataset for all six providers.
- [`providers/openai.json`](providers/openai.json) — current OpenAI frontier, GPT-4o mini/GPT-4.1/GPT-5/o3 families, Realtime, Audio, TTS, image, transcription, and Whisper endpoints.
- [`providers/anthropic.json`](providers/anthropic.json) — Claude Fable 5, Opus 5, Sonnet 5, and Haiku 4.5.
- [`providers/gemini.json`](providers/gemini.json) — current Gemini 3.x Pro, Flash, and Flash-Lite endpoints.
- [`providers/deepseek.json`](providers/deepseek.json) — DeepSeek V4 Pro and V4 Flash.
- [`providers/mistral.json`](providers/mistral.json) — current Mistral general-purpose, code, and Ministral models.
- [`providers/kimi.json`](providers/kimi.json) — Kimi K3, K2.7 Code, and K2.6.

Every provider file contains `currency`, `unit`, `updatedAt`, and a `models` object. Each model provides `name`, `category`, `input`, optional `cachedInput`, `output`, and `contextWindow`; models with tiered pricing also include `longContext*` metadata.

## Official sources

- [OpenAI model catalog and pricing](https://developers.openai.com/api/docs/models/all)
- [Anthropic model overview](https://platform.claude.com/docs/en/about-claude/models/overview) and [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Gemini models](https://ai.google.dev/gemini-api/docs/models), [pricing](https://ai.google.dev/gemini-api/docs/pricing), and [deprecations](https://ai.google.dev/gemini-api/docs/deprecations)
- [DeepSeek models and pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Mistral model overview](https://docs.mistral.ai/models/overview) and [API pricing](https://mistral.ai/pricing/api/)
- [Kimi API platform pricing](https://platform.kimi.ai/)

## Usage examples

### JavaScript / Node.js

```javascript
const response = await fetch(
  'https://raw.githubusercontent.com/adamejzak/ai-pricing/main/pricing.json'
);
const data = await response.json();

const kimiK3 = data.providers.kimi.models['kimi-k3'];
console.log(`Kimi K3 input: $${kimiK3.input} / 1M tokens`);
```

### Python

```python
import requests

url = "https://raw.githubusercontent.com/adamejzak/ai-pricing/main/pricing.json"
data = requests.get(url).json()

deepseek_v4 = data["providers"]["deepseek"]["models"]["deepseek-v4-pro"]
print(f"DeepSeek V4 Pro output: ${deepseek_v4['output']} / 1M tokens")
```

## License

MIT License. See [`LICENSE`](LICENSE).
