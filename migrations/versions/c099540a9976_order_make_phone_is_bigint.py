"""order: make phone is bigint

Revision ID: c099540a9976
Revises: c68f797b3f74
Create Date: 2023-08-18 14:20:42.823902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c099540a9976"
down_revision = "c68f797b3f74"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column("order", "phone", type_=sa.BigInteger())


def downgrade() -> None:
    op.alter_column("order", "phone", type_=sa.Integer())
