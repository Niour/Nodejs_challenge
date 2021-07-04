--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Debian 13.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3 (Debian 13.3-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Companies; Type: TABLE; Schema: public; Owner: career
--

CREATE TABLE public."Companies" (
    id integer NOT NULL,
    "companyName" character varying(255),
    "companyUserId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Companies" OWNER TO career;

--
-- Name: Companies_id_seq; Type: SEQUENCE; Schema: public; Owner: career
--

CREATE SEQUENCE public."Companies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Companies_id_seq" OWNER TO career;

--
-- Name: Companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: career
--

ALTER SEQUENCE public."Companies_id_seq" OWNED BY public."Companies".id;


--
-- Name: Jobs; Type: TABLE; Schema: public; Owner: career
--

CREATE TABLE public."Jobs" (
    id integer NOT NULL,
    title character varying(255),
    "companyId" integer,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Jobs" OWNER TO career;

--
-- Name: Jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: career
--

CREATE SEQUENCE public."Jobs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Jobs_id_seq" OWNER TO career;

--
-- Name: Jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: career
--

ALTER SEQUENCE public."Jobs_id_seq" OWNED BY public."Jobs".id;


--
-- Name: Logs; Type: TABLE; Schema: public; Owner: career
--

CREATE TABLE public."Logs" (
    id integer NOT NULL,
    uid integer,
    method character varying(255),
    path character varying(255),
    route character varying(255),
    status integer,
    milliseconds integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Logs" OWNER TO career;

--
-- Name: Logs_id_seq; Type: SEQUENCE; Schema: public; Owner: career
--

CREATE SEQUENCE public."Logs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Logs_id_seq" OWNER TO career;

--
-- Name: Logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: career
--

ALTER SEQUENCE public."Logs_id_seq" OWNED BY public."Logs".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: career
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO career;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: career
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO career;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: career
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Companies id; Type: DEFAULT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Companies" ALTER COLUMN id SET DEFAULT nextval('public."Companies_id_seq"'::regclass);


--
-- Name: Jobs id; Type: DEFAULT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Jobs" ALTER COLUMN id SET DEFAULT nextval('public."Jobs_id_seq"'::regclass);


--
-- Name: Logs id; Type: DEFAULT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Logs" ALTER COLUMN id SET DEFAULT nextval('public."Logs_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Companies; Type: TABLE DATA; Schema: public; Owner: career
--

COPY public."Companies" (id, "companyName", "companyUserId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Jobs; Type: TABLE DATA; Schema: public; Owner: career
--

COPY public."Jobs" (id, title, "companyId", description, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Logs; Type: TABLE DATA; Schema: public; Owner: career
--

COPY public."Logs" (id, uid, method, path, route, status, milliseconds, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: career
--

COPY public."Users" (id, username, email, password, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: Companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: career
--

SELECT pg_catalog.setval('public."Companies_id_seq"', 1, false);


--
-- Name: Jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: career
--

SELECT pg_catalog.setval('public."Jobs_id_seq"', 1, false);


--
-- Name: Logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: career
--

SELECT pg_catalog.setval('public."Logs_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: career
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- Name: Companies Companies_pkey; Type: CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_pkey" PRIMARY KEY (id);


--
-- Name: Jobs Jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Jobs"
    ADD CONSTRAINT "Jobs_pkey" PRIMARY KEY (id);


--
-- Name: Logs Logs_pkey; Type: CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Logs"
    ADD CONSTRAINT "Logs_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Companies Companies_companyUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Jobs Jobs_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: career
--

ALTER TABLE ONLY public."Jobs"
    ADD CONSTRAINT "Jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

