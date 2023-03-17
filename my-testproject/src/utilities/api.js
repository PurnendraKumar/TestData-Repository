const base_path = "https://localhost:443/syntbots-ai/dev_assistant"
export const apiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ZGFfdXNlcjpsdUVZa0MqSko5SDhaandLcE5rWFdTQDhXUw==',
}
export const search_atom_search = `${base_path}/search_documents`
export const search_snippets = `${base_path}/search_snippets`
export const generate_code_external = `${base_path}/generate_code`
export const search_ai_atom_search = `${base_path}/generate_text`