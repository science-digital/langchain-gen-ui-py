"""
TODO
"""

import os
from typing import Dict, Union

import requests
from langchain.pydantic_v1 import BaseModel, Field
from langchain_core.tools import tool


class ActionSelectorInput(BaseModel):
    actions: str = Field(...,
                         description="The potential actions.")
    actions_relate_to: str = Field(...,
                                   description="The things which the actions relate to.")


@tool("action-selector", args_schema=ActionSelectorInput, return_direct=True)
def action_selector(actions: str, actions_relate_to: str) -> Union[Dict, str]:
    """Get the possible actions to take next."""

    print('actions:', actions)
    print('actions_relate_to:', actions_relate_to)

    return {
        "actions": [
            {
                "label": "Pay a $1M bonus 💰",
                "didActionMsg": "Done. I transferred $1,000,000 to their account.",
                "id": "foo",
            },
            {
                "label": "Gift 12x weeks extra leave 🎁",
                "didActionMsg": "Ok, I've updated their leave balance.",
                "id": "bar",
            },
            {
                "label": "Buy them a beer 🍺",
                "didActionMsg": "Ok, I've sent them a gift card.",
                "id": "baz",
            }
        ]
    }
