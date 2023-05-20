export interface GPTPrompt {
    model: "gpt-3.5-turbo";
    messages: {
        role: "user" | "system" | "assistant";
        content: string
    }[]
}

export const createCharacterSummaryPrompt = (props: {
    level: string,
    race: string,
    class: string
}): GPTPrompt => ({
    "model": "gpt-3.5-turbo",
    "messages": [{
        "role": "user",
        "content": `Recount the history for a level ${props.level} ${props.race} ${props.class} in the style of a D&D book. Do not give them any weapons or armour, and keep in mind that a level 1 character is an apprentice adventurer. Add a twist to the backstory that would motivate the character. Leave plenty of story hooks that the GM could use to weave in the character to the story.

Respond only in this format:

# Name
[name]

# Allies 
[3 allies listed in a bullet pointed list]

# Enemies
[3 enemies listed in a bullet pointed list]

# Backstory
[backstory describing the character's history]

# Summary
[a summary of who the character is at this moment in time]`
    }]
})