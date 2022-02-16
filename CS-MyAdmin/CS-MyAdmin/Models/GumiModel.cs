using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Collections.ObjectModel;

namespace CS_MyAdmin.Models
{
    class GumiModel
    {
        private int _gId;

        public int gId
        {
            get { return _gId; }
            set { _gId = value; }
        }

        private string _gyarto;

        public string gyarto
        {
            get { return _gyarto; }
            set { _gyarto = value; }
        }

        private string _evszak;

        public string evszak
        {
            get { return _evszak; }
            set { _evszak = value; }
        }

        private int _kategoria;

        public int kategoria
        {
            get { return _kategoria; }
            set { _kategoria = value; }
        }

        private int _ar;

        public int ar
        {
            get { return _ar; }
            set { _ar = value; }
        }

        private int _atmero;

        public int atmero
        {
            get { return _atmero; }
            set { _atmero = value; }
        }

        private int _oldalFal;

        public int oldalFal
        {
            get { return _oldalFal; }
            set { _oldalFal = value; }
        }

        private int _szelesseg;

        public int szelesseg
        {
            get { return _szelesseg; }
            set { _szelesseg = value; }
        }

        public GumiModel()
        {

        }

        public GumiModel(MySqlDataReader reader)
        {
            this.gId = Convert.ToInt32(reader["GID"]);
            this.gyarto = reader["Gyarto"].ToString();
            this.evszak = reader["Evszak"].ToString();
            this.kategoria = Convert.ToInt32(reader["Kategoria"]);
            this.ar = Convert.ToInt32(reader["Ar"]);
            this.atmero = Convert.ToInt32(reader["Atmero"]);
            this.oldalFal = Convert.ToInt32(reader["Oldalfal"]);
            this.szelesseg = Convert.ToInt32(reader["Szelesseg"]);


        }
        public static ObservableCollection<GumiModel> select()
        {
            var lista = new ObservableCollection<GumiModel>();

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "SELECT * FROM gumiabroncs";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new GumiModel(reader));
                        }
                    }
                }
            }
            return lista;
        }

        public static void update(int id, string gyarto, string evszak, int kategoria, int ar, int atmero, int oldalfal, int szelesseg)
        {

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "UPDATE `gumiabroncs` SET `GID`= @id,`Gyarto`= @gyarto,`Evszak`= @evszak,`Kategoria`= @kategoria,`Ar`= @ar,`Atmero`= @atmero,`Oldalfal`= @oldalfal,`Szelesseg`= @szelesseg WHERE GID = @id";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@gyarto", gyarto);
                    cmd.Parameters.AddWithValue("@evszak", evszak);
                    cmd.Parameters.AddWithValue("@kategoria", kategoria);
                    cmd.Parameters.AddWithValue("@ar", ar);
                    cmd.Parameters.AddWithValue("@atmero", atmero);
                    cmd.Parameters.AddWithValue("@oldalfal", oldalfal);
                    cmd.Parameters.AddWithValue("@szelesseg", szelesseg);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public static void insert(string gyarto, string evszak, int kategoria, int ar, int atmero, int oldalfal, int szelesseg)
        {
            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "INSERT INTO `gumiabroncs`(`Gyarto`, `Evszak`, `Kategoria`, `Ar`, `Atmero`, `Oldalfal`, `Szelesseg`) VALUES (@gyarto, @evszak, @kategoria, @ar, @atmero, @oldalfal, @szelesseg)";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@gyarto", gyarto);
                    cmd.Parameters.AddWithValue("@evszak", evszak);
                    cmd.Parameters.AddWithValue("@kategoria", kategoria);
                    cmd.Parameters.AddWithValue("@ar", ar);
                    cmd.Parameters.AddWithValue("@atmero", atmero);
                    cmd.Parameters.AddWithValue("@oldalfal", oldalfal);
                    cmd.Parameters.AddWithValue("@szelesseg", szelesseg);

                    cmd.ExecuteNonQuery();
                }

            }
        }









    }
}
