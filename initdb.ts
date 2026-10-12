import sql from 'better-sqlite3';

const db = sql('meals.db');

type DummyMeal = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

const dummyMeals: DummyMeal[] = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: '/images/burger.jpg',
    summary:
      'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `
1. Prepare the patty:
   Mix 200g of ground beef with salt and pepper. Form into a patty.

2. Cook the patty:
   Heat a pan with a bit of oil. Cook the patty for 3-4 minutes per side, then add a slice of cheese on top.

3. Assemble the burger:
   Toast the bun halves, add lettuce, tomato and the patty, then close the burger.

4. Serve:
   Enjoy your burger hot, with fries on the side.
`,
    creator: 'John Doe',
    creator_email: 'john@example.com',
  },
  {
    title: 'Spicy Curry',
    slug: 'spicy-curry',
    image: '/images/curry.jpg',
    summary:
      'A rich and flavorful curry with a spicy kick, perfect with rice or naan.',
    instructions: `
1. Prepare the base:
   Fry chopped onions, garlic and ginger until golden.

2. Add the spices:
   Stir in curry powder, turmeric and chili, then add chopped tomatoes.

3. Simmer:
   Add vegetables or chicken and coconut milk. Simmer for 20 minutes.

4. Serve:
   Serve hot with rice or naan.
`,
    creator: 'Max Schwarz',
    creator_email: 'max@example.com',
  },
  {
    title: 'Homemade Dumplings',
    slug: 'homemade-dumplings',
    image: '/images/dumplings.jpg',
    summary:
      'Soft dumplings filled with a savory mixture, steamed to perfection.',
    instructions: `
1. Make the dough:
   Mix flour with warm water and knead until smooth. Let it rest for 30 minutes.

2. Prepare the filling:
   Combine minced meat, chopped cabbage, soy sauce and ginger.

3. Fill and fold:
   Roll the dough thin, cut circles, add filling and fold.

4. Steam:
   Steam the dumplings for 10 minutes and serve with dipping sauce.
`,
    creator: 'Emily Chen',
    creator_email: 'emilychen@example.com',
  },
  {
    title: 'Classic Mac n Cheese',
    slug: 'classic-mac-n-cheese',
    image: '/images/macncheese.jpg',
    summary: 'Creamy, cheesy macaroni baked until golden on top.',
    instructions: `
1. Cook the pasta:
   Boil macaroni until al dente, then drain.

2. Make the sauce:
   Melt butter, stir in flour, add milk and whisk until thick. Mix in grated cheese.

3. Combine:
   Fold the pasta into the sauce and pour into a baking dish.

4. Bake:
   Top with cheese and bake at 200°C for 15 minutes.
`,
    creator: 'Laura Smith',
    creator_email: 'laurasmith@example.com',
  },
  {
    title: 'Authentic Pizza',
    slug: 'authentic-pizza',
    image: '/images/pizza.jpg',
    summary:
      'A thin-crust pizza with tomato sauce, mozzarella and fresh basil.',
    instructions: `
1. Make the dough:
   Mix flour, water, yeast and salt. Knead and let it rise for 1 hour.

2. Prepare the toppings:
   Spread tomato sauce over the stretched dough and add mozzarella.

3. Bake:
   Bake at the highest oven temperature for 8-10 minutes.

4. Finish:
   Top with fresh basil and a drizzle of olive oil.
`,
    creator: 'Mario Rossi',
    creator_email: 'mariorossi@example.com',
  },
  {
    title: 'Wiener Schnitzel',
    slug: 'wiener-schnitzel',
    image: '/images/schnitzel.jpg',
    summary: 'Crispy breaded veal cutlet, a classic Austrian dish.',
    instructions: `
1. Prepare the meat:
   Pound the cutlets thin and season with salt.

2. Bread the cutlets:
   Coat in flour, then beaten egg, then breadcrumbs.

3. Fry:
   Fry in hot oil until golden on both sides.

4. Serve:
   Serve with a lemon wedge and potato salad.
`,
    creator: 'Franz Huber',
    creator_email: 'franzhuber@example.com',
  },
  {
    title: 'Fresh Tomato Salad',
    slug: 'fresh-tomato-salad',
    image: '/images/tomato-salad.jpg',
    summary: 'A light salad of ripe tomatoes, herbs and olive oil.',
    instructions: `
1. Prepare the tomatoes:
   Slice ripe tomatoes and place them in a bowl.

2. Add the dressing:
   Drizzle with olive oil and a splash of vinegar, then season with salt and pepper.

3. Add herbs:
   Sprinkle with fresh basil and thinly sliced onion.

4. Serve:
   Let it rest for 10 minutes, then serve fresh.
`,
    creator: 'Sophia Green',
    creator_email: 'sophiagreen@example.com',
  },
];

db.exec(`
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT OR IGNORE INTO meals
    (slug, title, image, summary, instructions, creator, creator_email)
  VALUES (
    @slug,
    @title,
    @image,
    @summary,
    @instructions,
    @creator,
    @creator_email
  )
`);

for (const meal of dummyMeals) {
  insert.run(meal);
}

console.log(`Database initialized with ${dummyMeals.length} meals.`);