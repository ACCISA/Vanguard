import sqlite3
import os
import logging

"""
Database structure
Version       |Msf exploit path           | arguments
-----------------------------------------------------------
postgresql 8.3| linux/postgresql_backdoor | rhosts,lhost

"""

class ExploitDB():
    def __init__(self) -> None:

        logging.debug("Initiating the database.")

        # Check if the database file already exists
        database_name = "exploits.db"
        if os.path.exists(database_name):
            logging.debug(f"Database '{database_name}' already exists.")
            return

        # If the database doesn't exist, create it
        try:
            connection = sqlite3.connect(database_name)
            cursor = connection.cursor()

            # Create a table with columns
            create_table_query = '''
                CREATE TABLE IF NOT EXISTS exploits (
                id INTEGER PRIMARY KEY,
                version TEXT NOT NULL,
                path TEXT NOT NULL,
                arguments TEXT NOT NULL
            );
            '''

            create_sessions_table_query = '''
                CREATE TABLE IF NOT EXISTS sessions (
                    id INTEGER PRIMARY KEY,
                    session_id TEXT NOT NULL,
                    session_uuid TEXT NOT NULL
            );
            '''

            cursor.execute(create_table_query)
            cursor.execute(create_sessions_table_query)
            connection.commit()

            logging.debug(f"Table 'exploits' created successfully.")

        except sqlite3.Error as e:
            logging.debug(f"Error creating table: {e}")

        finally:
            if connection:
                connection.close()


    def add_entry(self, data):

        logging.debug(f"Adding data: {data}")

        for d in data:
            if self.retrieve_data(d[0])[0]:
                logging.debug("Data already exists in the table. Skipping insertion.")
                return
            
        try:
            connection = sqlite3.connect("exploits.db")
            cursor = connection.cursor()

            # Insert data into the table
            insert_query = '''
                INSERT INTO exploits (version, path, arguments) VALUES (?, ?, ?);
            '''
            cursor.executemany(insert_query, data)
            connection.commit()

            logging.debug(f"Data inserted successfully.")

        except sqlite3.Error as e:
            logging.debug(f"Error inserting data: {e}")

        finally:
            if connection:
                connection.close()

    def add_session(self, data):

        logging.debug(f"Adding data: {data}")
            
        try:
            connection = sqlite3.connect("exploits.db")
            cursor = connection.cursor()

            # Insert data into the table
            insert_query = '''
                INSERT INTO sessions (session_id, session_uuid) VALUES (?, ?);
            '''
            cursor.executemany(insert_query, data)
            connection.commit()

            logging.debug(f"Data inserted successfully.")

        except sqlite3.Error as e:
            logging.debug(f"Error inserting data: {e}")

        finally:
            if connection:
                connection.close()
                

    def remove_entry(self, version):

        logging.debug(f"Removing data for '{version}'")

        for v in version:
            if not self.retrieve_data(v):
                logging.debug(f"No data found for '{v}'. Skipping deletion.")
                return

        try:
            connection = sqlite3.connect("exploits.db")
            cursor = connection.cursor()

            # Delete data from the table
            delete_query = '''
                DELETE FROM exploits WHERE version = ?;
            '''
            cursor.execute(delete_query, (version,))
            connection.commit()

            logging.debug(f"Data deleted successfully.")

        except sqlite3.Error as e:
            logging.debug(f"Error deleting data: {e}")

        finally:
            if connection:
                connection.close()

    def retrieve_data(self, version) -> bool:

        logging.debug(f"Retrieving data for '{version}'")

        try:
            connection = sqlite3.connect("exploits.db")
            cursor = connection.cursor()

            # Retrieve data from the table based on the version
            select_query = '''
                SELECT * FROM exploits WHERE version = ?;
            '''
            cursor.execute(select_query, (version,))
            result = cursor.fetchall()    

            if result:
                logging.debug(f"Data for '{version}': {result}")
            else:
                logging.debug(f"No data found for '{version}'.")

            return (True, result) if result else (False, None)

        except sqlite3.Error as e:
            logging.debug(f"Error retrieving data: {e}")

        finally:
            if connection:
                connection.close()

    