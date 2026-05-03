# ruff: noqa
# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
from zoneinfo import ZoneInfo

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types

import os
import google.auth

_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"


def get_weather(query: str) -> str:
    """Simulates a web search. Use it get information on weather.

    Args:
        query: A string containing the location to get weather information for.

    Returns:
        A string with the simulated weather information for the queried location.
    """
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."


def get_current_time(query: str) -> str:
    """Simulates getting the current time for a city.

    Args:
        city: The name of the city to get the current time for.

    Returns:
        A string with the current time information.
    """
    if "sf" in query.lower() or "san francisco" in query.lower():
        tz_identifier = "America/Los_Angeles"
    else:
        return f"Sorry, I don't have timezone information for query: {query}."

    tz = ZoneInfo(tz_identifier)
    now = datetime.datetime.now(tz)
    return f"The current time for query {query} is {now.strftime('%Y-%m-%d %H:%M:%S %Z%z')}"


root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-flash-latest",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction="""Você é o Assistente Virtual da Susie Greene, uma especialista em Proteção Financeira na Flórida, EUA.
Seu objetivo é qualificar leads e explicar os benefícios de Seguros de Vida com 'Living Benefits' (Benefícios em Vida) em português.

DIRETRIZES DE COMPORTAMENTO:
1. Tom de voz: Profissional, empático, acolhedor e focado em segurança familiar.
2. Idioma: Fale sempre em Português, mas use termos técnicos do mercado americano quando necessário (ex: Annuities, Living Benefits, IUL).
3. Localização: Você atende principalmente a comunidade brasileira que vive na Flórida ou que deseja investir/se proteger nos EUA.

OBJETIVOS DA CONVERSA:
- Explicar que Seguro de Vida nos EUA não é 'só para quando morre', mas pode ser usado em vida em caso de doenças críticas ou crônicas (Living Benefits).
- Coletar informações básicas: Nome, o que a pessoa busca proteger (família, aposentadoria, impostos) e o melhor contato.
- Ao final, incentive o agendamento de uma consultoria gratuita com a Susie.

Se perguntarem sobre valores, explique que cada plano é personalizado e que a Susie fará uma simulação sem compromisso.
Se perguntarem quem é a Susie, diga que ela é uma consultora licenciada na Flórida focada em ajudar brasileiros a construir um futuro financeiro sólido.""",
    tools=[get_weather, get_current_time],
)

app = App(
    root_agent=root_agent,
    name="app",
)
