using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Collections.ObjectModel;

namespace CS_MyAdmin.Models
{
    class InfoModel
    {
        private int _IID;

        public int IID
        {
            get { return _IID; }
            set { _IID = value; }
        }

        private string _rendszam;

        public string rendszam
        {
            get { return _rendszam; }
            set { _rendszam = value; }
        }

        private string _alvazszam;

        public string alvazszam
        {
            get { return _alvazszam; }
            set { _alvazszam = value; }
        }

        private int _futottKm;

        public int futottKm
        {
            get { return _futottKm; }
            set { _futottKm = value; }
        }

        private int _evJarat;

        public int evJarat
        {
            get { return _evJarat; }
            set { _evJarat = value; }
        }

        private string _allapot;

        public string allapot
        {
            get { return _allapot; }
            set { _allapot = value; }
        }

        private int _szervKonyv;

        public int szervKonyv
        {
            get { return _szervKonyv; }
            set { _szervKonyv = value; }
        }

        private string _okmanyok;

        public string okmanyok
        {
            get { return _okmanyok; }
            set { _okmanyok = value; }
        }

        private DateTime _muszaki;

        public DateTime muszaki
        {
            get { return _muszaki; }
            set { _muszaki = value; }
        }

        private string _GumiAbroncs;

        public string GumiAbroncs
        {
            get { return _GumiAbroncs; }
            set { _GumiAbroncs = value; }
        }

        private int _AutoID;

        public int AutoID
        {
            get { return _AutoID; }
            set { _AutoID = value; }
        }

        private string _kepcim;

        public string kepcim
        {
            get { return _kepcim; }
            set { _kepcim = value; }
        }

        public InfoModel()
        {

        }

        public InfoModel(MySqlDataReader reader)
        {
            this.IID = Convert.ToInt32(reader["IID"]);
            this.rendszam = reader["Rendszam"].ToString();
            this.alvazszam = reader["Alvazszam"].ToString();
            this.futottKm = Convert.ToInt32(reader["Futottkm"]);
            this.evJarat = Convert.ToInt32(reader["Evjarat"]);
            this.allapot = reader["Allapot"].ToString();
            this.szervKonyv = Convert.ToInt32(reader["VezetettSzervK"]);
            this.okmanyok = reader["Okmanyok"].ToString();
            this.muszaki = Convert.ToDateTime(reader["Muszakierv"]);
            this.GumiAbroncs = reader["Gumiabroncs"].ToString();


        }

        public static ObservableCollection<InfoModel> select()
        {
            var lista = new ObservableCollection<InfoModel>();

            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                var sql = "SELECT * FROM info";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new InfoModel(reader));
                        }
                    }
                }
            }
            return lista;
        }










    }
}
