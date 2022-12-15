-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Doctor', 'Pacient', 'Clinic');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Pacient',
    "clinicId" TEXT,
    "doctorId" TEXT,
    "pacientId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic" (
    "id" TEXT NOT NULL,
    "nameClinic" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" TEXT NOT NULL,
    "nameDoctor" TEXT NOT NULL,
    "punctuation" INTEGER,
    "address" TEXT,
    "crm" TEXT NOT NULL,
    "rg" TEXT,
    "cpf" TEXT NOT NULL,
    "Speciality" TEXT[],
    "clinicId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacient" (
    "id" TEXT NOT NULL,
    "namePacient" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clinicId" TEXT,

    CONSTRAINT "pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_nameClinic_key" ON "clinic"("nameClinic");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_cnpj_key" ON "clinic"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "clinic_phone_key" ON "clinic"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_nameDoctor_key" ON "doctor"("nameDoctor");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_crm_key" ON "doctor"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_rg_key" ON "doctor"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_cpf_key" ON "doctor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pacient_namePacient_key" ON "pacient"("namePacient");

-- CreateIndex
CREATE UNIQUE INDEX "pacient_address_key" ON "pacient"("address");

-- CreateIndex
CREATE UNIQUE INDEX "pacient_rg_key" ON "pacient"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "pacient_cpf_key" ON "pacient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pacient_phone_key" ON "pacient"("phone");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "pacient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacient" ADD CONSTRAINT "pacient_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
