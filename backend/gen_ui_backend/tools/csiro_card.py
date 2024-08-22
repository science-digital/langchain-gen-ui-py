"""
The CSIRO Card tool is used to get information 
about a CSIRO employee from the CSIRO People API.

You must set $CSIRO_PEOPLE_URL and $CSIRO_PEOPLE_API_KEY to use this tool.
"""

import os
from typing import Dict, Union

import requests
from langchain.pydantic_v1 import BaseModel, Field
from langchain_core.tools import tool


class CSIROCardInput(BaseModel):
    first_name: str = Field(...,
                            description="The first name of the CSIRO employee.")
    last_name: str = Field(...,
                           description="The last name of the CSIRO employee.")


@tool("csiro-card", args_schema=CSIROCardInput, return_direct=True)
def csiro_card(first_name: str, last_name: str) -> Union[Dict, str]:
    """Get information about a CSIRO employee."""

    CSIRO_PEOPLE_URL = os.environ.get("CSIRO_PEOPLE_URL")
    if not CSIRO_PEOPLE_URL:
        raise ValueError("Missing CSIRO_PEOPLE_URL secret.")

    CSIRO_PEOPLE_API_KEY = os.environ.get("CSIRO_PEOPLE_API_KEY")
    if not CSIRO_PEOPLE_API_KEY:
        raise ValueError("Missing CSIRO_PEOPLE_API_KEY secret.")

    headers = {
        "Accept": "application/json",
    }

    # Search for the employee by first and last name
    # (this query could probs be improved..)
    url = f"{CSIRO_PEOPLE_URL}?$filter=contains(FirstName%2C'{first_name}')%20and%20contains(LastName%2C'{last_name}')&$top=1&$count=false&api_key={CSIRO_PEOPLE_API_KEY}"

    try:
        response = requests.get(url, headers=headers, verify=False)
        response.raise_for_status()
        repo_data = response.json()
        if not repo_data or len(repo_data) == 0:
            return "No CSIRO employee found with the given first and last names."

        profile = repo_data[0]
        profle_link = ""
        orchid_link = ""
        for link in profile["Links"]:
            if link["Rel"] == "self":
                profle_link = link["Href"]
            if link["Rel"] == "orcid":
                orchid_link = link["Href"]

        return {
            "firstName": profile["FirstName"],
            "lastName": profile["LastName"],
            "email": profile["SystemEmailAddress"],
            "profileLink": profle_link,
            "orchidLink": orchid_link,
            "orgUnitName": profile["OrgUnitName"],
            "businessUnitName": profile["BusinessUnitName"],
            "groupName": profile["GroupName"],
            "locationName": profile["LocationName"],
        }
    except requests.exceptions.RequestException as err:
        print(err)
        return "There was an error fetching the profile. Please check the names."
