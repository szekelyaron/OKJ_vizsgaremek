using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Collections.ObjectModel;

namespace CS_MyAdmin.Models
{
    class AutoModel
    {
        private int _aId;

        public int aId
        {
            get { return _aId; }
            set { _aId = value; }
        }

        private string _gyarto;

        public string gyarto
        {
            get { return _gyarto; }
            set { _gyarto = value; }
        }

        private string _tipus;

        public string tipus
        {
            get { return _tipus; }
            set { _tipus = value; }
        }

        private int _megbizhatosag;

        public int megbizhatosag
        {
            get { return _megbizhatosag; }
            set { _megbizhatosag = value; }
        }

        private string _tipusHiba;

        public string tipusHiba
        {
            get { return _tipusHiba; }
            set { _tipusHiba = value; }
        }

        public AutoModel()
        {

        }

        public AutoModel(MySqlDataReader reader)
        {
            this.aId = Convert.ToInt32(reader["AID"]);
            this.gyarto = reader["Gyarto"].ToString();
            this.tipus = reader["Tipus"].ToString();
            this.megbizhatosag = Convert.ToInt32(reader["Megbizhatosag"]);
            this.tipusHiba = reader["Tipshiba"].ToString();
        }

        public static ObservableCollection<AutoModel> select()
        {
            var lista = new ObservableCollection<AutoModel>();

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "SELECT * FROM auto";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new AutoModel(reader));
                        }
                    }
                }
            }
            return lista;
        }

        public static void update(int id, string gyarto, string tipus, int megbizhatosag, string tipushiba)
        {
            var lista = new ObservableCollection<AutoModel>();

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "UPDATE auto SET AID = @id, Gyarto = @gyarto, Tipus = @tipus, Megbizhatosag = @megbizhatosag, Tipshiba = @tipushiba WHERE AID = @id";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@gyarto", gyarto);
                    cmd.Parameters.AddWithValue("@tipus", tipus);
                    cmd.Parameters.AddWithValue("@megbizhatosag", megbizhatosag);
                    cmd.Parameters.AddWithValue("@tipushiba", tipushiba);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
