document.addEventListener('DOMContentLoaded', async () => {
  let pricingData = null;
  let activeProvider = 'all';
  let activeCategory = 'all';
  let searchQuery = '';
  let currentView = 'grid'; // 'grid' or 'table'

  // Fallback dataset for local file:// usage when pricing.json cannot be fetched.
  const fallbackDataset = {
    "updatedAt": "2026-08-05",
    "currency": "USD",
    "providers": {
      "openai": {
        "name": "OpenAI",
        "models": {
          "gpt-5.6-sol": { "name": "GPT-5.6 Sol", "category": "flagship", "input": 5.0, "cachedInput": 0.5, "output": 30.0, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.6-terra": { "name": "GPT-5.6 Terra", "category": "general", "input": 2.0, "cachedInput": 0.2, "output": 12.0, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.6-luna": { "name": "GPT-5.6 Luna", "category": "fast", "input": 0.2, "cachedInput": 0.02, "output": 1.2, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.5": { "name": "GPT-5.5", "category": "flagship", "input": 5.0, "cachedInput": 0.5, "output": 30.0, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.5-pro": { "name": "GPT-5.5 Pro", "category": "flagship", "input": 30.0, "output": 180.0, "batchDiscount": 0.5, "contextWindow": 1050000 },
          "gpt-5.4": { "name": "GPT-5.4", "category": "general", "input": 2.5, "cachedInput": 0.25, "output": 15.0, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.4-pro": { "name": "GPT-5.4 Pro", "category": "flagship", "input": 30.0, "output": 180.0, "batchDiscount": 0.5, "longContextThreshold": 272000, "longContextInputMultiplier": 2.0, "longContextOutputMultiplier": 1.5, "contextWindow": 1050000 },
          "gpt-5.4-mini": { "name": "GPT-5.4 Mini", "category": "fast", "input": 0.75, "cachedInput": 0.075, "output": 4.5, "batchDiscount": 0.5, "contextWindow": 400000 },
          "gpt-5.4-nano": { "name": "GPT-5.4 Nano", "category": "fast", "input": 0.2, "cachedInput": 0.02, "output": 1.25, "batchDiscount": 0.5, "contextWindow": 400000 },
          "gpt-4o": { "name": "GPT-4o", "category": "general", "input": 2.5, "cachedInput": 1.25, "output": 10.0, "batchDiscount": 0.5, "contextWindow": 128000 },
          "gpt-4o-mini": { "name": "GPT-4o mini", "category": "fast", "input": 0.15, "cachedInput": 0.075, "output": 0.6, "batchDiscount": 0.5, "contextWindow": 128000 },
          "o1": { "name": "o1", "category": "reasoning", "input": 15.0, "cachedInput": 7.5, "output": 60.0, "batchDiscount": 0.5, "contextWindow": 200000 },
          "o1-pro": { "name": "o1-pro", "category": "reasoning", "input": 150.0, "output": 600.0, "batchDiscount": 0.5, "contextWindow": 200000 },
          "o3": { "name": "o3", "category": "reasoning", "input": 2.0, "cachedInput": 0.5, "output": 8.0, "batchDiscount": 0.5, "contextWindow": 200000 },
          "o3-pro": { "name": "o3-pro", "category": "reasoning", "input": 20.0, "output": 80.0, "batchDiscount": 0.5, "contextWindow": 200000 },
          "o3-mini": { "name": "o3-mini", "category": "reasoning", "input": 1.1, "cachedInput": 0.55, "output": 4.4, "batchDiscount": 0.5, "contextWindow": 200000 },
          "o4-mini": { "name": "o4-mini", "category": "reasoning", "input": 1.1, "cachedInput": 0.275, "output": 4.4, "batchDiscount": 0.5, "contextWindow": 200000 },
          "gpt-realtime-2.1": { "name": "GPT-Realtime-2.1", "category": "realtime", "input": 4.0, "cachedInput": 0.4, "output": 24.0, "audioInput": 32.0, "audioCachedInput": 0.4, "audioOutput": 64.0, "imageInput": 5.0, "imageCachedInput": 0.5, "contextWindow": 128000 },
          "gpt-realtime-2.1-mini": { "name": "GPT-Realtime-2.1 mini", "category": "realtime", "input": 0.6, "cachedInput": 0.06, "output": 2.4, "audioInput": 10.0, "audioCachedInput": 0.3, "audioOutput": 20.0, "imageInput": 0.8, "imageCachedInput": 0.08, "contextWindow": 128000 },
          "gpt-realtime-2": { "name": "GPT-Realtime-2", "category": "realtime", "input": 4.0, "cachedInput": 0.4, "output": 24.0, "audioInput": 32.0, "audioCachedInput": 0.4, "audioOutput": 64.0, "imageInput": 5.0, "imageCachedInput": 0.5, "contextWindow": 128000 },
          "gpt-realtime-1.5": { "name": "GPT-Realtime-1.5", "category": "realtime", "input": 4.0, "cachedInput": 0.4, "output": 16.0, "audioInput": 32.0, "audioCachedInput": 0.4, "audioOutput": 64.0, "imageInput": 5.0, "imageCachedInput": 0.5, "contextWindow": 32000 },
          "gpt-audio-1.5": { "name": "GPT-Audio-1.5", "category": "audio", "input": 2.5, "output": 10.0, "audioInput": 32.0, "audioOutput": 64.0, "contextWindow": 128000 },
          "gpt-4o-mini-tts": { "name": "GPT-4o mini TTS", "category": "audio", "input": 0.6, "audioOutput": 12.0, "contextWindow": 2000 },
          "gpt-image-2": { "name": "GPT Image 2", "category": "image", "input": 5.0, "cachedInput": 1.25, "output": 30.0, "imageInput": 8.0, "imageCachedInput": 2.0, "imageOutput": 30.0, "contextWindow": 400000 },
          "gpt-4o-transcribe": { "name": "GPT-4o Transcribe", "category": "transcription", "input": 2.5, "output": 10.0, "pricePerMinute": 0.006, "contextWindow": 128000 },
          "gpt-4o-mini-transcribe": { "name": "GPT-4o mini Transcribe", "category": "transcription", "input": 1.25, "output": 5.0, "pricePerMinute": 0.003, "contextWindow": 128000 },
          "gpt-transcribe": { "name": "GPT Transcribe", "category": "transcription", "pricePerMinute": 0.0045, "contextWindow": 0 },
          "gpt-live-transcribe": { "name": "GPT Live Transcribe", "category": "transcription", "pricePerMinute": 0.017, "contextWindow": 0 },
          "gpt-realtime-whisper": { "name": "GPT-Realtime-Whisper", "category": "transcription", "pricePerMinute": 0.017, "contextWindow": 0 },
          "tts-1": { "name": "TTS-1", "category": "audio", "pricePer1KCharacters": 0.015, "contextWindow": 0 },
          "tts-1-hd": { "name": "TTS-1 HD", "category": "audio", "pricePer1KCharacters": 0.03, "contextWindow": 0 },
          "whisper-1": { "name": "Whisper", "category": "transcription", "pricePerMinute": 0.006, "contextWindow": 0 },
          "gpt-4.1": { "name": "GPT-4.1", "category": "general", "input": 2.0, "cachedInput": 0.5, "output": 8.0, "contextWindow": 1047576 },
          "gpt-4.1-mini": { "name": "GPT-4.1 mini", "category": "fast", "input": 0.4, "cachedInput": 0.1, "output": 1.6, "contextWindow": 1047576 },
          "gpt-5": { "name": "GPT-5", "category": "reasoning", "input": 1.25, "cachedInput": 0.125, "output": 10.0, "contextWindow": 400000 },
          "gpt-5-mini": { "name": "GPT-5 mini", "category": "reasoning", "input": 0.25, "cachedInput": 0.025, "output": 2.0, "contextWindow": 400000 },
          "gpt-5.1": { "name": "GPT-5.1", "category": "reasoning", "input": 1.25, "cachedInput": 0.125, "output": 10.0, "contextWindow": 400000 },
          "gpt-5.2": { "name": "GPT-5.2", "category": "reasoning", "input": 1.75, "cachedInput": 0.175, "output": 14.0, "contextWindow": 400000 },
          "gpt-5.2-pro": { "name": "GPT-5.2 Pro", "category": "reasoning", "input": 21.0, "output": 168.0, "contextWindow": 400000 },
          "gpt-5.3-codex": { "name": "GPT-5.3-Codex", "category": "code", "input": 1.75, "cachedInput": 0.175, "output": 14.0, "contextWindow": 400000 }
        }
      },
      "anthropic": {
        "name": "Anthropic",
        "models": {
          "claude-fable-5": { "name": "Claude Fable 5", "category": "flagship", "input": 10.0, "cachedInput": 1.0, "output": 50.0, "batchDiscount": 0.5, "contextWindow": 1000000 },
          "claude-opus-5": { "name": "Claude Opus 5", "category": "flagship", "input": 5.0, "cachedInput": 0.5, "output": 25.0, "batchDiscount": 0.5, "contextWindow": 1000000 },
          "claude-sonnet-5": { "name": "Claude Sonnet 5", "category": "general", "input": 2.0, "cachedInput": 0.2, "output": 10.0, "batchDiscount": 0.5, "contextWindow": 1000000 },
          "claude-haiku-4-5": { "name": "Claude Haiku 4.5", "category": "fast", "input": 1.0, "cachedInput": 0.1, "output": 5.0, "batchDiscount": 0.5, "contextWindow": 200000 }
        }
      },
      "gemini": {
        "name": "Google Gemini",
        "models": {
          "gemini-3.1-pro": { "name": "Gemini 3.1 Pro", "category": "flagship", "input": 2.0, "cachedInput": 0.2, "output": 12.0, "longContextThreshold": 200000, "longContextInput": 4.0, "longContextCachedInput": 0.4, "longContextOutput": 18.0, "contextWindow": 2097152 },
          "gemini-3.1-pro-preview": { "name": "Gemini 3.1 Pro Preview", "category": "flagship", "input": 2.0, "cachedInput": 0.2, "output": 12.0, "longContextThreshold": 200000, "longContextInput": 4.0, "longContextCachedInput": 0.4, "longContextOutput": 18.0, "contextWindow": 1048576 },
          "gemini-3.6-flash": { "name": "Gemini 3.6 Flash", "category": "fast", "input": 1.5, "cachedInput": 0.15, "output": 7.5, "contextWindow": 1048576 },
          "gemini-3.5-flash": { "name": "Gemini 3.5 Flash", "category": "fast", "input": 1.5, "cachedInput": 0.15, "output": 9.0, "contextWindow": 1048576 },
          "gemini-3.5-flash-lite": { "name": "Gemini 3.5 Flash-Lite", "category": "fast", "input": 0.3, "cachedInput": 0.03, "output": 2.5, "contextWindow": 1048576 },
          "gemini-3.1-flash": { "name": "Gemini 3.1 Flash", "category": "fast", "input": 0.5, "cachedInput": 0.05, "output": 3.0, "contextWindow": 1048576 },
          "gemini-3.1-flash-lite": { "name": "Gemini 3.1 Flash-Lite", "category": "fast", "input": 0.25, "cachedInput": 0.025, "output": 1.5, "contextWindow": 1048576 },
          "gemini-2.5-pro": { "name": "Gemini 2.5 Pro", "category": "flagship", "input": 1.25, "cachedInput": 0.3, "output": 10.0, "longContextThreshold": 128000, "longContextInput": 2.5, "longContextCachedInput": 0.6, "longContextOutput": 15.0, "contextWindow": 2000000 },
          "gemini-2.5-flash": { "name": "Gemini 2.5 Flash", "category": "fast", "input": 0.075, "cachedInput": 0.01875, "output": 0.3, "contextWindow": 1000000 },
          "gemini-2.0-pro": { "name": "Gemini 2.0 Pro", "category": "general", "input": 1.25, "cachedInput": 0.3125, "output": 5.0, "contextWindow": 2000000 },
          "gemini-2.0-flash": { "name": "Gemini 2.0 Flash", "category": "fast", "input": 0.1, "cachedInput": 0.025, "output": 0.4, "contextWindow": 1000000 },
          "gemini-2.0-flash-lite": { "name": "Gemini 2.0 Flash-Lite", "category": "fast", "input": 0.075, "cachedInput": 0.01875, "output": 0.3, "contextWindow": 1000000 },
          "gemini-1.5-pro": { "name": "Gemini 1.5 Pro", "category": "general", "input": 1.25, "cachedInput": 0.3125, "output": 5.0, "longContextThreshold": 128000, "longContextInput": 2.5, "longContextCachedInput": 0.625, "longContextOutput": 10.0, "contextWindow": 2000000 },
          "gemini-1.5-flash": { "name": "Gemini 1.5 Flash", "category": "fast", "input": 0.075, "cachedInput": 0.01875, "output": 0.3, "longContextThreshold": 128000, "longContextInput": 0.15, "longContextCachedInput": 0.0375, "longContextOutput": 0.6, "contextWindow": 1000000 },
          "gemini-1.5-flash-8b": { "name": "Gemini 1.5 Flash-8B", "category": "fast", "input": 0.0375, "cachedInput": 0.01, "output": 0.15, "contextWindow": 1000000 }
        }
      },
      "deepseek": {
        "name": "DeepSeek",
        "models": {
          "deepseek-v4-pro": { "name": "DeepSeek V4 Pro", "category": "flagship", "input": 0.435, "cachedInput": 0.003625, "output": 0.87, "contextWindow": 1000000 },
          "deepseek-v4-flash": { "name": "DeepSeek V4 Flash", "category": "fast", "input": 0.14, "cachedInput": 0.0028, "output": 0.28, "contextWindow": 1000000 },
          "deepseek-v3": { "name": "DeepSeek V3 (deepseek-chat)", "category": "general", "input": 0.14, "cachedInput": 0.014, "output": 0.28, "contextWindow": 64000 },
          "deepseek-r1": { "name": "DeepSeek R1 (deepseek-reasoner)", "category": "reasoning", "input": 0.55, "cachedInput": 0.14, "output": 2.19, "contextWindow": 64000 },
          "deepseek-coder": { "name": "DeepSeek Coder", "category": "code", "input": 0.14, "cachedInput": 0.014, "output": 0.28, "contextWindow": 64000 }
        }
      },
      "mistral": {
        "name": "Mistral AI",
        "models": {
          "mistral-medium-latest": { "name": "Mistral Medium 3.5", "category": "flagship", "input": 1.5, "cachedInput": 0.15, "output": 7.5, "contextWindow": 256000 },
          "mistral-large-latest": { "name": "Mistral Large 3", "category": "flagship", "input": 0.5, "cachedInput": 0.05, "output": 1.5, "contextWindow": 256000 },
          "mistral-small-latest": { "name": "Mistral Small 4", "category": "fast", "input": 0.15, "cachedInput": 0.015, "output": 0.6, "contextWindow": 256000 },
          "codestral-latest": { "name": "Codestral 2508", "category": "code", "input": 0.3, "cachedInput": 0.03, "output": 0.9, "contextWindow": 128000 },
          "pixtral-large-latest": { "name": "Pixtral Large 2411", "category": "vision", "input": 2.0, "output": 6.0, "contextWindow": 128000 },
          "ministral-14b-latest": { "name": "Ministral 3 14B", "category": "general", "input": 0.2, "cachedInput": 0.02, "output": 0.2, "contextWindow": 256000 },
          "ministral-8b-latest": { "name": "Ministral 3 8B", "category": "fast", "input": 0.15, "cachedInput": 0.015, "output": 0.15, "contextWindow": 256000 },
          "ministral-3b-latest": { "name": "Ministral 3 3B", "category": "fast", "input": 0.1, "cachedInput": 0.01, "output": 0.1, "contextWindow": 256000 },
          "open-mixtral-8x22b": { "name": "Mixtral 8x22B", "category": "general", "input": 2.0, "output": 6.0, "contextWindow": 64000 },
          "open-mixtral-8x7b": { "name": "Mixtral 8x7B", "category": "fast", "input": 0.7, "output": 0.7, "contextWindow": 32000 },
          "mistral-embed": { "name": "Mistral Embed", "category": "embedding", "input": 0.1, "output": 0.0, "contextWindow": 8192 }
        }
      },
      "kimi": {
        "name": "Kimi",
        "models": {
          "kimi-k3": { "name": "Kimi K3", "category": "flagship", "input": 3.0, "cachedInput": 0.3, "output": 15.0, "contextWindow": 1000000 },
          "kimi-k2.7-code": { "name": "Kimi K2.7 Code", "category": "code", "input": 0.95, "cachedInput": 0.19, "output": 4.0, "contextWindow": 256000 },
          "kimi-k2.6": { "name": "Kimi K2.6", "category": "general", "input": 0.95, "cachedInput": 0.16, "output": 4.0, "contextWindow": 256000 },
          "kimi-k1.5": { "name": "Kimi K1.5", "category": "general", "input": 0.80, "cachedInput": 0.10, "output": 3.0, "contextWindow": 128000 },
          "moonshot-v1-128k": { "name": "Moonshot V1 128k", "category": "general", "input": 0.80, "cachedInput": 0.10, "output": 3.0, "contextWindow": 128000 },
          "moonshot-v1-32k": { "name": "Moonshot V1 32k", "category": "fast", "input": 0.35, "cachedInput": 0.05, "output": 1.5, "contextWindow": 32000 },
          "moonshot-v1-8k": { "name": "Moonshot V1 8k", "category": "fast", "input": 0.15, "cachedInput": 0.02, "output": 0.6, "contextWindow": 8192 }
        }
      }
    }
  };

  // Load JSON
  try {
    const res = await fetch('pricing.json');
    if (res.ok) {
      pricingData = await res.json();
    } else {
      pricingData = fallbackDataset;
    }
  } catch (err) {
    pricingData = fallbackDataset;
  }

  // Flatten models array for easy filtering & calculation
  function getAllModels() {
    const list = [];
    if (!pricingData || !pricingData.providers) return list;

    Object.keys(pricingData.providers).forEach(pKey => {
      const p = pricingData.providers[pKey];
      Object.keys(p.models).forEach(mKey => {
        const m = p.models[mKey];
        list.push({
          id: mKey,
          providerKey: pKey,
          providerName: p.name,
          ...m
        });
      });
    });
    return list;
  }

  const allModels = getAllModels();

  // Elements
  const promptInput = document.getElementById('prompt-tokens');
  const outputInput = document.getElementById('output-tokens');
  const useCacheInput = document.getElementById('use-cache');
  const searchInput = document.getElementById('search-input');
  const modelsGrid = document.getElementById('models-grid');
  const tableBody = document.getElementById('table-body');
  const modelCountEl = document.getElementById('model-count');
  const topResultEl = document.getElementById('calculator-top-result');

  // Event Listeners for Calculator
  promptInput.addEventListener('input', updateView);
  outputInput.addEventListener('input', updateView);
  useCacheInput.addEventListener('change', updateView);
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    updateView();
  });

  // Presets
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      promptInput.value = btn.dataset.input;
      outputInput.value = btn.dataset.output;
      updateView();
    });
  });

  // Provider tabs
  document.querySelectorAll('#provider-tabs .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#provider-tabs .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProvider = btn.dataset.provider;
      updateView();
    });
  });

  // Category pills
  document.querySelectorAll('#category-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#category-pills .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      updateView();
    });
  });

  // View Toggle
  document.getElementById('btn-grid-view').addEventListener('click', () => {
    currentView = 'grid';
    document.getElementById('btn-grid-view').classList.add('active');
    document.getElementById('btn-table-view').classList.remove('active');
    document.getElementById('models-grid').classList.remove('hidden');
    document.getElementById('models-table-wrapper').classList.add('hidden');
  });

  document.getElementById('btn-table-view').addEventListener('click', () => {
    currentView = 'table';
    document.getElementById('btn-table-view').classList.add('active');
    document.getElementById('btn-grid-view').classList.remove('active');
    document.getElementById('models-grid').classList.add('hidden');
    document.getElementById('models-table-wrapper').classList.remove('hidden');
  });

  // Cost calculation, including provider-published long-context tiers.
  function calculateCost(model, promptTokens, outputTokens, useCache) {
    if (typeof model.input !== 'number' || typeof model.output !== 'number') return null;
    const useCachedRate = useCache && model.cachedInput !== undefined;
    const isLongContext = model.longContextThreshold !== undefined && promptTokens > model.longContextThreshold;
    let inputRate = useCachedRate ? model.cachedInput : model.input;
    let outputRate = model.output;

    if (isLongContext) {
      if (useCachedRate && model.longContextCachedInput !== undefined) {
        inputRate = model.longContextCachedInput;
      } else if (!useCachedRate && model.longContextInput !== undefined) {
        inputRate = model.longContextInput;
      } else {
        inputRate *= model.longContextInputMultiplier || 1;
      }
      outputRate = model.longContextOutput !== undefined
        ? model.longContextOutput
        : outputRate * (model.longContextOutputMultiplier || 1);
    }

    const inputCost = (promptTokens / 1000000) * inputRate;
    const outputCost = (outputTokens / 1000000) * outputRate;
    return inputCost + outputCost;
  }

  function formatCurrency(val) {
    if (!Number.isFinite(val)) return '—';
    if (val === 0) return '$0.00';
    if (val < 0.0001) return '< $0.0001';
    if (val < 0.01) return '$' + val.toFixed(4);
    return '$' + val.toFixed(2);
  }

  function formatRate(val) {
    if (typeof val !== 'number' || !Number.isFinite(val)) return '—';
    if (val === 0) return '$0.00';
    const decimals = val < 0.01 ? 6 : val < 1 ? 4 : 2;
    return '$' + val.toFixed(decimals).replace(/0+$/, '').replace(/\.$/, '');
  }

  function formatContext(tokens) {
    if (!tokens) return 'N/A';
    if (tokens >= 1000000) return (tokens / 1000000).toFixed(1) + 'M tokens';
    return (tokens / 1000).toFixed(0) + 'k tokens';
  }

  // Render & Filter logic
  function updateView() {
    const promptTokens = parseFloat(promptInput.value) || 0;
    const outputTokens = parseFloat(outputInput.value) || 0;
    const useCache = useCacheInput.checked;

    // Filter models
    const filtered = allModels.filter(m => {
      const matchesProvider = (activeProvider === 'all') || (m.providerKey === activeProvider);
      const matchesCategory = (activeCategory === 'all') || (m.category === activeCategory);
      const matchesSearch = !searchQuery || 
        m.name.toLowerCase().includes(searchQuery) || 
        m.id.toLowerCase().includes(searchQuery) ||
        m.providerName.toLowerCase().includes(searchQuery);

      return matchesProvider && matchesCategory && matchesSearch;
    });

    // Calculate costs & sort
    filtered.forEach(m => {
      m.currentCost = calculateCost(m, promptTokens, outputTokens, useCache);
    });

    modelCountEl.textContent = `Showing ${filtered.length} of ${allModels.length} models`;

    // Render Calculator Top Results
    renderTopResults(filtered);

    // Render Grid
    renderGrid(filtered);

    // Render Table
    renderTable(filtered);
  }

  function renderTopResults(models) {
    if (models.length === 0) {
      topResultEl.innerHTML = '<div class="preview-title">No models match filters</div>';
      return;
    }

    const sorted = [...models].sort((a, b) => (a.currentCost ?? Infinity) - (b.currentCost ?? Infinity));
    const cheapest = sorted[0];
    const top3 = sorted.slice(0, 3);

    topResultEl.innerHTML = `
      <div class="preview-title">Lowest Estimated Request Cost</div>
      <div class="top-models-bar">
        ${top3.map(m => `
          <div class="top-model-item">
            <div>
              <span class="provider-badge ${m.providerKey}">${m.providerName}</span>
              <div class="top-model-name">${m.name}</div>
            </div>
            <div class="top-model-cost">${formatCurrency(m.currentCost)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderGrid(models) {
    modelsGrid.innerHTML = models.map(m => `
      <div class="model-card">
        <div>
          <div class="card-top">
            <span class="provider-badge ${m.providerKey}">${m.providerName}</span>
            <span class="category-tag">${m.category || 'general'}</span>
          </div>
          <div class="model-name">${m.name}</div>
          <div class="context-window">Context: ${formatContext(m.contextWindow)}</div>

          <div class="price-details">
            <div class="price-row">
              <span class="label">Input / 1M:</span>
              <span class="value">${formatRate(m.input)}</span>
            </div>
            ${m.cachedInput !== undefined ? `
              <div class="price-row">
                <span class="label">Cached Input / 1M:</span>
                <span class="value" style="color: #34d399;">${formatRate(m.cachedInput)}</span>
              </div>
            ` : ''}
            <div class="price-row">
              <span class="label">Output / 1M:</span>
              <span class="value">${formatRate(m.output)}</span>
            </div>
            ${m.pricePerMinute !== undefined ? `<div class="price-row"><span class="label">Audio:</span><span class="value">$${m.pricePerMinute} / min</span></div>` : ''}
            ${m.pricePer1KCharacters !== undefined ? `<div class="price-row"><span class="label">Speech:</span><span class="value">$${m.pricePer1KCharacters} / 1k chars</span></div>` : ''}
          </div>
        </div>

        <div class="card-calc-result">
          <span class="calc-total-label">Est. Request Cost:</span>
          <span class="calc-total-value">${formatCurrency(m.currentCost)}</span>
        </div>
      </div>
    `).join('');
  }

  function renderTable(models) {
    tableBody.innerHTML = models.map(m => `
      <tr>
        <td><strong>${m.name}</strong> <br><small style="color: var(--text-dim);">${m.id}</small></td>
        <td><span class="provider-badge ${m.providerKey}">${m.providerName}</span></td>
        <td><span class="category-tag">${m.category || 'general'}</span></td>
        <td>${formatContext(m.contextWindow)}</td>
        <td class="mono">${formatRate(m.input)}</td>
        <td class="mono" style="color: #34d399;">${m.cachedInput !== undefined ? formatRate(m.cachedInput) : '-'}</td>
        <td class="mono">${formatRate(m.output)}</td>
        <td class="mono" style="color: #34d399; font-weight: 700;">${formatCurrency(m.currentCost)}</td>
      </tr>
    `).join('');
  }

  // Initial rendering
  updateView();
});
