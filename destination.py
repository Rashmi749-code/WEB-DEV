import sqlite3

def init_db():
    conn = sqlite3.connect('aura.db')
    cursor = conn.cursor()
    # Create the table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            price TEXT NOT NULL,
            aura TEXT NOT NULL,
            image_url TEXT NOT NULL
        )
    ''')
    
   
    destinations = [
        ('The Glass House', 'Iceland', '$450', 'Zen', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946'),
        ('Amalfi Coast Villa', 'Italy', '$600', 'Vintage', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963'),
        ('Azure Sanctuary', 'Maldives', '$850', 'Serene', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8')
    ]
    
    cursor.executemany('INSERT INTO destinations (name, location, price, aura, image_url) VALUES (?,?,?,?,?)', destinations)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()

    print("Database Aura.db initialized with classy spots!")
