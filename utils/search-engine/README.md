# 🧠 Friend Search Suggestion Engine (For Chat App)

This is a real-time search system for the **“Add Friend”** feature in my chat app.  
The goal is to provide **instant, ranked search suggestions** as users type — using a custom-built **Trie (prefix tree)** and data fetched from Supabase.

---

## ✅ What This Is

A module that:
- Fetches users from Supabase
- Stores them in an in-memory Trie for fast prefix search
- Returns suggestions based on user input (`"mic"` → `"Michael"`, `"Mica"`, etc.)
- (Later) Falls back to Supabase if no match
- (Future) Will transition to Redis for shared, fast cache

---

## 🧱 Project Status

- [x] Setting up `trie.ts` (core Trie structure)  
- [ ] Add ranking logic (`search.ts`)  
- [ ] Hook it into UI with `useFriendSearch()`  
- [ ] Build `<FriendSearchInput />` React component  
- [ ] Fallback query to Supabase  
- [ ] Realtime sync with Supabase  
- [ ] Optional: Redis integration later

---

## 📁 Folder Structure (planned)

```
/utils/search-engine
├── trie.ts # Trie class (insert, getSuggestions)
├── search.ts # Ranks suggestions based on match quality
├── useFriendSearch.ts # React hook to use Trie with input
```
---

## 🔧 Current Focus: `trie.ts`

This file defines the **Trie data structure**.  
Used to index and retrieve usernames by prefix, very fast.

### ✅ What it supports:
- Insert user info (username + reference)
- Lookup suggestions by prefix
- Traverse suggestions using DFS

### 🧪 Example Usage:

```ts
import { Trie } from './trie';

const trie = new Trie();

// Insert users (after fetching from Supabase)
trie.insert("michael", { id: "123", username: "michael", full_name: "Michael Ygaña" });
trie.insert("miguel", { id: "456", username: "miguel", full_name: "Miguel Totenem" });

// Get suggestions based on prefix
const suggestions = trie.getSuggestions("mic");
// returns array of users that match prefix "mic"
```

### Next Steps After trie.ts
1. Build a scoring function (in search.ts) to rank exact match > prefix > partial

2. Create useFriendSearch() to:

- Watch input

- Query Trie

- Show results

- Fallback to Supabase if Trie empty

3. Build FriendSearchInput.tsx with:

- Input field

- Dropdown of suggestions

4. Add a way to sync Trie when new users are added (Supabase Realtime)

### Future Plans
* Replace in-memory Trie with Redis (shared cache)
* Add fuzzy matching (Levenshtein or fuse.js)
* Filter out current user's friends from results
* Support paginated fetch of users from Supabase
